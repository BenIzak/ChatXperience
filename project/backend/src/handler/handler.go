package handler

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"

	"github.com/BenIzak/ChatXperience/project/src/entity"
	myhttp "github.com/BenIzak/ChatXperience/project/src/http"
	"github.com/BenIzak/ChatXperience/project/src/message"
	tokenvalidate "github.com/BenIzak/ChatXperience/project/src/token"
	"github.com/BenIzak/ChatXperience/project/src/usersgroups"
	"github.com/gorilla/websocket"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
)

// WebSocketMessage représente un message WebSocket
type WebSocketMessage struct {
	Sender  string `json:"sender"`
	Content string `json:"content"`
	GroupID string `json:"groupID"`
}

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
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
	handlers.Use(middleware.Logger)

	handlers.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome to the API ChartXperience !"))
	})

	handlers.Post("/user", myhttp.CreateUserEndpoint(db))
	handlers.Post("/login", myhttp.LoginEndpoint(db))
	handlers.Get("/user/{userID:[0-9+]}", myhttp.GetUserByIDEndpoint(db))
	handlers.Get("/users", myhttp.GetAllUsersEndpoint(db))
	handlers.Delete("/user/{userID:[0-9+]}", myhttp.DeleteUserByIDEndpoint(db))
	handlers.Patch("/user/{userID:[0-9+]}", myhttp.UpdateUserByIDEndpoint(db))

	handlers.Post("/group", myhttp.CreateGroupEndpoint(db))
	handlers.Get("/user/{userID:[0-9]+}/groups", myhttp.GetGroupsByUserIDEndpoint(db))
	handlers.Get("/group/{groupID:[0-9+]}", myhttp.GetGroupByIDEndpoint(db))
	handlers.Patch("/group/{groupID:[0-9+]}", myhttp.UpdateGroupByIDEndpoint(db))
	handlers.Delete("/group/{groupID:[0-9+]}", myhttp.DeleteGroupByIDEndpoint(db))

	handlers.Post("/usersgroup/add", myhttp.AddUsersGroupEndpoint(db))
	handlers.Delete("/usersgroup/remove", myhttp.RemoveUsersGroupEndpoint(db))
	handlers.Get("/usersgroup/{groupID:[0-9+]}", myhttp.GetUsersByGroupIDEndpoint(db))

	handlers.Post("/message", myhttp.CreateMessageEndpoint(db))
	handlers.Get("/messages/{groupID:[0-9+]}", myhttp.GetMessagesByGroupIDEndpoint(db))
	handlers.Delete("/message", myhttp.DeleteMessageByIDEndpoint(db))

	// Dans votre fonction NewHandler, ajoutez ceci pour gérer la connexion WebSocket initiale
	handlers.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(w, r)
	})

	go handleMessages(db)

	return handlers
}

// Définir une structure pour le client WebSocket
type Client struct {
	Conn   *websocket.Conn
	UserID int
}

var upgrader = websocket.Upgrader{}

// clients garde une trace des clients connectés
var clients = make(map[*websocket.Conn]*Client)

// broadcast diffuse les messages aux clients connectés
var broadcast = make(chan WebSocketMessage)

func serveWs(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	// Récupérer le jeton JWT à partir de la chaîne de requête
	token := r.URL.Query().Get("token")
	if token == "" {
		http.Error(w, "Missing token", http.StatusUnauthorized)
		return
	}

	// Valider le jeton JWT et obtenir l'ID de l'utilisateur
	userID, err := tokenvalidate.ValidateTokenAndGetUserID(token)
	if err != nil {
		http.Error(w, "Invalid token: "+err.Error(), http.StatusUnauthorized)
		return
	}

	// Établir la connexion WebSocket
	ws, err := websocket.Upgrade(w, r, nil, 1024, 1024)
	if err != nil {
		log.Println(err)
		return
	}
	defer ws.Close()

	// Créer une nouvelle instance de client avec l'identifiant de l'utilisateur
	client := &Client{Conn: ws, UserID: userID}
	clients[ws] = client

	log.Printf("Connected: UserID %d", userID)

	// Lire et traiter les messages envoyés par le client
	for {
		var message WebSocketMessage
		err := ws.ReadJSON(&message)
		if err != nil {
			log.Printf("Error occurred: %v", err)
			delete(clients, ws) // Supprimer le client de la liste lorsqu'il se déconnecte
			break
		}
		log.Printf("Received message: %s from UserID %d", message.Content, userID)

		// Diffuser le message à tous les clients connectés
		broadcast <- message
	}
}

// Fonction pour écouter les messages broadcastés et les traiter
func handleMessages(db *sql.DB) {
	for {
		// Attendre un message sur le canal de diffusion
		msg := <-broadcast
		sender, err := strconv.Atoi(msg.Sender)
		if err != nil {
			log.Printf("error occurred while inting message sender: %v", err)
		}
		groupID, err := strconv.Atoi(msg.GroupID)
		if err != nil {
			log.Printf("error occurred while inting message group: %v", err)
		}

		users, err := usersgroups.GetUsersByGroupID(db, groupID)
		if err != nil {
			log.Println("error while getting users od the group : %s", err)
		}

		var usersID []int

		for _, usersdata := range users {
			usersID = append(usersID, usersdata.ID)
		}

		// Parcourir tous les clients connectés et envoyer le message à celui dont l'ID correspond au receiver
		for _, client := range clients {
			for _, id := range usersID {
				if id == client.UserID {
					err := client.Conn.WriteJSON(msg)
					if err != nil {
						log.Printf("error occurred while broadcasting message: %v", err)
						// En cas d'erreur d'écriture, supprimer le client de la liste
						delete(clients, client.Conn)
					}
				}
			}
			_, err = message.CreateMessage(db, sender, groupID, msg.Content)
		}
	}
}

type HandlerReference struct {
	*chi.Mux
	User       *entity.User
	Group      *entity.Group
	UsersGroup *entity.UsersGroup
	Message    *entity.Message
}

type Message struct {
	Message string `json:"message"`
}
