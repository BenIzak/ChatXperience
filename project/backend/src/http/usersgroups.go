package http

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/BenIzak/ChatXperience/project/src/entity"
	"github.com/BenIzak/ChatXperience/project/src/token"
	"github.com/BenIzak/ChatXperience/project/src/usersgroups"
	"github.com/go-chi/chi"
)

func AddUsersGroupEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		var newusersgroups entity.UsersGroup
		if err = json.NewDecoder(r.Body).Decode(&newusersgroups); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}

		if newusersgroups.UserID == 0 || newusersgroups.GroupID == 0 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("UserID and GroupID are required"))
			return
		}

		usersgroup, err := usersgroups.AddUsersGroup(db, newusersgroups.UserID, newusersgroups.GroupID)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		jsonUsersGroup, err := json.Marshal(usersgroup)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonUsersGroup)
	}
}

func RemoveUsersGroupEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		var newusersgroups entity.UsersGroup
		if err := json.NewDecoder(r.Body).Decode(&newusersgroups); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}

		if newusersgroups.UserID == 0 || newusersgroups.GroupID == 0 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("UserID and GroupID are required"))
			return
		}

		err = usersgroups.RemoveUsersGroup(db, newusersgroups.UserID, newusersgroups.GroupID)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}

func GetUsersByGroupIDEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		groupIDString := chi.URLParam(r, "groupID")

		groupID, err := strconv.Atoi(groupIDString)
		if err != nil {
			http.Error(w, "Invalid Group ID", http.StatusBadRequest)
			return
		}

		users, err := usersgroups.GetUsersByGroupID(db, groupID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		if err := json.NewEncoder(w).Encode(users); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
	}
}
