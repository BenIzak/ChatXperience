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
		log.Println("Attempting to log in with body:", r.Body)
		var loginUser entity.User
		if err := json.NewDecoder(r.Body).Decode(&loginUser); err != nil {
			log.Printf("JSON decode error: %v", err)
			http.Error(w, `{"error": "Invalid JSON"}`, http.StatusBadRequest)
			return
		}

		log.Printf("Logging in user: %s", loginUser.Email)
		userID, token, err := user.Login(db, loginUser.Email, loginUser.Passwd)
		if err != nil {
			log.Printf("Login error: %v", err)
			http.Error(w, `{"error": "Login failed"}`, http.StatusInternalServerError)
			return
		}

		log.Printf("Login successful: UserID: %d, Token: %s", userID, token)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"userId": userID,
			"token":  token,
		})
	}
}

func GetUserByIDEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// _, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		// if err != nil {
		// 	http.Error(w, "Invalid token", http.StatusUnauthorized)
		// 	return
		// }
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

func GetAllUsersEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		users, err := user.GetAllUsers(db)
		if err != nil {
			log.Printf("Error fetching users: %v", err)
			http.Error(w, "Failed to fetch users", http.StatusInternalServerError)
			return
		}

		if len(users) == 0 {
			w.WriteHeader(http.StatusNotFound)
			w.Write([]byte("No users found"))
			return
		}

		response, err := json.Marshal(users)
		if err != nil {
			log.Printf("Error marshaling users: %v", err)
			http.Error(w, "Error processing users data", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(response)
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
