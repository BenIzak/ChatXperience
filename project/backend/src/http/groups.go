package http

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/BenIzak/ChatXperience/project/src/entity"
	"github.com/BenIzak/ChatXperience/project/src/group"
	"github.com/BenIzak/ChatXperience/project/src/token"

	"github.com/go-chi/chi"
)

func CreateGroupEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		var newgroup entity.Group
		if err := json.NewDecoder(r.Body).Decode(&newgroup); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}

		if newgroup.CreatorID == 0 || newgroup.Name == "" {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("CreatorID and Name are required"))
			return
		}

		group, err := group.CreateGroup(db, newgroup.CreatorID, newgroup.Name, newgroup.Public, newgroup.Description)
		if err != nil {
			log.Printf("Erreur lors de la création du groupe : %v", err)
			http.Error(w, "Erreur lors de la création du groupe", http.StatusInternalServerError)
			return
		}

		jsonGroup, err := json.Marshal(group)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonGroup)
	}
}

func GetGroupByIDEndpoint(db *sql.DB) http.HandlerFunc {
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

		group, err := group.GetGroupByID(db, groupID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		if err := json.NewEncoder(w).Encode(group); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
	}
}

func UpdateGroupByIDEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		var newgroup entity.Group
		if err := json.NewDecoder(r.Body).Decode(&newgroup); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}

		groupIDString := chi.URLParam(r, "groupID")

		groupID, err := strconv.Atoi(groupIDString)
		if err != nil {
			http.Error(w, "Invalid Group ID", http.StatusBadRequest)
			return
		}

		updatedGroup, err := group.UpdateGroupByID(db, groupID, newgroup.Name, newgroup.Public, newgroup.Description)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		if err := json.NewEncoder(w).Encode(updatedGroup); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
	}
}

func DeleteGroupByIDEndpoint(db *sql.DB) http.HandlerFunc {
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

		err = group.DeleteGroupByID(db, groupID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}
