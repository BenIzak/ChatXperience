package http

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/BenIzak/ChatXperience/project/src/entity"
	"github.com/BenIzak/ChatXperience/project/src/token"
	"github.com/BenIzak/ChatXperience/project/src/user"
	"github.com/go-chi/chi"
)

func CreateUserEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		newUser := entity.User{}
		err := json.NewDecoder(r.Body).Decode(&newUser)
		if err != nil {
			log.Printf("Erreur de décodage JSON : %v", err)
			http.Error(w, "Erreur de décodage JSON", http.StatusBadRequest)
			return
		}

		if newUser.FirstName == "" || newUser.LastName == "" || newUser.Passwd == "" || newUser.Email == "" {
			http.Error(w, "firstname, lastname, password and email are required", http.StatusBadRequest)
			return
		}

		user, err := user.CreateUser(db, newUser.FirstName, newUser.LastName, newUser.Passwd, newUser.Email)
		if err != nil {
			log.Printf("Erreur lors de la création de l'utilisateur : %v", err)
			http.Error(w, "Erreur lors de la création de l'utilisateur", http.StatusInternalServerError)
			return
		}
		jsonUser, err := json.Marshal(user)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonUser)
	}
}

func LoginEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var newUser entity.User
		err := json.NewDecoder(r.Body).Decode(&newUser)
		if err != nil {
			log.Printf("Erreur de décodage JSON : %v", err)
			http.Error(w, "Erreur de décodage JSON", http.StatusBadRequest)
			return
		}

		userID, tk, err := user.Login(db, newUser.Email, newUser.Passwd)
		if err != nil {
			log.Printf("Erreur lors de la connexion de l'utilisateur : %v", err)
			http.Error(w, "Erreur lors de la connexion de l'utilisateur", http.StatusInternalServerError)
			return
		}

		response := struct {
			UserID int    `json:"userId"`
			Token  string `json:"token"`
		}{
			UserID: userID,
			Token:  tk,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func GetUserByIDEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		userIDString := chi.URLParam(r, "userID")

		userID, err := strconv.Atoi(userIDString)
		if err != nil {
			http.Error(w, "Invalid User ID", http.StatusBadRequest)
			return
		}

		user, err := user.GetUserByID(db, userID)
		if err != nil {
			log.Printf("Erreur lors de la récupération de l'utilisateur : %v", err)
			http.Error(w, "Erreur lors de la récupération de l'utilisateur", http.StatusInternalServerError)
			return
		}

		jsonUser, err := json.Marshal(user)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonUser)
	}
}

func DeleteUserByIDEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		userIDString := chi.URLParam(r, "userID")

		userID, err := strconv.Atoi(userIDString)
		if err != nil {
			http.Error(w, "Invalid User ID", http.StatusBadRequest)
			return
		}

		err = user.DeleteUserByID(db, userID)
		if err != nil {
			log.Printf("Erreur lors de la suppression de l'utilisateur : %v", err)
			http.Error(w, "Erreur lors de la suppression de l'utilisateur", http.StatusInternalServerError)
			return
		}

		w.Write([]byte("Utilisateur supprimé avec succès"))
	}
}

func UpdateUserByIDEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		userIDString := chi.URLParam(r, "userID")

		userID, err := strconv.Atoi(userIDString)
		if err != nil {
			http.Error(w, "Invalid User ID", http.StatusBadRequest)
			return
		}

		newUser := entity.User{}
		err = json.NewDecoder(r.Body).Decode(&newUser)
		if err != nil {
			log.Printf("Erreur de décodage JSON : %v", err)
			http.Error(w, "Erreur de décodage JSON", http.StatusBadRequest)
			return
		}

		user, err := user.UpdateUserByID(db, userID, newUser.FirstName, newUser.LastName, newUser.Passwd, newUser.Email)
		if err != nil {
			log.Printf("Erreur lors de la mise à jour de l'utilisateur : %v", err)
			http.Error(w, "Erreur lors de la mise à jour de l'utilisateur", http.StatusInternalServerError)
			return
		}

		jsonUser, err := json.Marshal(user)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonUser)
	}
}
