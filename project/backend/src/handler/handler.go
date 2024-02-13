package handler

import (
	"database/sql"
	"net/http"

	"github.com/BenIzak/ChatXperience/project/src/entity"
	myhttp "github.com/BenIzak/ChatXperience/project/src/http"
	"github.com/BenIzak/ChatXperience/project/src/ws"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
)

func NewHandler(db *sql.DB, ref entity.Reference, hub *ws.Hub) http.Handler {

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

	handlers.HandleFunc("/ws/createRoom", func(w http.ResponseWriter, r *http.Request) {
		wsHandler := &ws.Handler{}
		wsHandler.CreateRoom(w, r, hub)
	})

	handlers.HandleFunc("/ws/joinRoom/{roomId}", func(w http.ResponseWriter, r *http.Request) {
		wsHandler := &ws.Handler{}
		wsHandler.JoinRoom(w, r, hub)
	})

	handlers.HandleFunc("/ws/getRooms", func(w http.ResponseWriter, r *http.Request) {
		wsHandler := &ws.Handler{}
		wsHandler.GetRooms(w, r, hub)
	})

	handlers.HandleFunc("/ws/getClients/{roomId}", func(w http.ResponseWriter, r *http.Request) {
		wsHandler := &ws.Handler{}
		wsHandler.GetClients(w, r, hub)
	})

	return handlers
}

type HandlerReference struct {
	*chi.Mux
	User       *entity.User
	Group      *entity.Group
	UsersGroup *entity.UsersGroup
	Message    *entity.Message
}
