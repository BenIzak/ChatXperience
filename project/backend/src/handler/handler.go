package handler

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/BenIzak/ChatXperience/project/src/entity"
	myhttp "github.com/BenIzak/ChatXperience/project/src/http"
	"github.com/gorilla/websocket"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
)

// WebSocketMessage représente un message WebSocket
type WebSocketMessage struct {
	Sender  string `json:"sender"`
	Content string `json:"content"`
}

// clients garde une trace des clients connectés
var clients = make(map[*websocket.Conn]bool)

// broadcast diffuse les messages aux clients connectés
var broadcast = make(chan WebSocketMessage)

func NewHandler(db *sql.DB, ref entity.Reference) http.Handler {

	handlers := &HandlerReference{
		chi.NewRouter(),
		ref.User,
		ref.Group,
		ref.UsersGroup,
		ref.Message,
	}

	// Cors middleware, the goal is to allow the front-end to access the API
	handlers.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // Met l'URL de ton front-end ici
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
	handlers.Use(middleware.Logger)

	handlers.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome to the API ChartXperience !"))
	})

	handlers.Post("/user", myhttp.CreateUserEndpoint(db))
	handlers.Get("/login", myhttp.LoginEndpoint(db))
	handlers.Get("/user/{userID:[0-9+]}", myhttp.GetUserByIDEndpoint(db))
	handlers.Delete("/user/{userID:[0-9+]}", myhttp.DeleteUserByIDEndpoint(db))
	handlers.Patch("/user/{userID:[0-9+]}", myhttp.UpdateUserByIDEndpoint(db))

	handlers.Post("/group", myhttp.CreateGroupEndpoint(db))
	handlers.Get("/group/{groupID:[0-9+]}", myhttp.GetGroupByIDEndpoint(db))
	handlers.Patch("/group/{groupID:[0-9+]}", myhttp.UpdateGroupByIDEndpoint(db))
	handlers.Delete("/group/{groupID:[0-9+]}", myhttp.DeleteGroupByIDEndpoint(db))

	handlers.Post("/usersgroup/add", myhttp.AddUsersGroupEndpoint(db))
	handlers.Delete("/usersgroup/remove", myhttp.RemoveUsersGroupEndpoint(db))

	handlers.Post("/message", myhttp.CreateMessageEndpoint(db))
	handlers.Get("/messages/{groupID:[0-9+]}", myhttp.GetMessagesByGroupIDEndpoint(db))
	handlers.Delete("/message", myhttp.DeleteMessageByIDEndpoint(db))

	// Dans votre fonction NewHandler, ajoutez ceci pour gérer la connexion WebSocket initiale
	handlers.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(w, r)
	})

	go handleMessages()

	return handlers
}

// Définir une structure pour le client WebSocket
type Client struct {
	Conn *websocket.Conn
}

// Fonction pour écouter les messages broadcastés et les traiter
func handleMessages() {
	for {
		// Attendre un message sur le canal de diffusion
		msg := <-broadcast

		// Traiter le message ici, par exemple, vous pouvez l'enregistrer en base de données, l'envoyer à d'autres clients, etc.
		log.Printf("Message received from %s: %s\n", msg.Sender, msg.Content)
	}
}

func serveWs(w http.ResponseWriter, r *http.Request) {
	conn, err := websocket.Upgrade(w, r, nil, 1024, 1024)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
		return
	}

	// Envoyer un message de confirmation au client WebSocket
	confirmation := "WebSocket connection established successfully!"
	err = conn.WriteMessage(websocket.TextMessage, []byte(confirmation))
	if err != nil {
		log.Printf("Error sending confirmation message: %v", err)
		conn.Close()
		return
	}

	// Ajouter le client à la liste des clients connectés
	clients[conn] = true

	// Commencer à écouter les messages du client WebSocket
	for {
		var msg WebSocketMessage
		// Lire le message du client
		err := conn.ReadJSON(&msg)
		if err != nil {
			log.Println("Client disconnected")
			break
		}
		// Diffuser le message à tous les clients connectés
		broadcast <- msg
	}

	// Supprimer le client de la liste des clients connectés lorsqu'il se déconnecte
	delete(clients, conn)
}

type HandlerReference struct {
	*chi.Mux
	User       *entity.User
	Group      *entity.Group
	UsersGroup *entity.UsersGroup
	Message    *entity.Message
}
