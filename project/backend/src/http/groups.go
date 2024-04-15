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

type CreateGroupRequest struct {
	entity.Group
	ParticipantIDs []int `json:"participantIDs"`
}

func CreateGroupEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req CreateGroupRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if req.Group.Name == "" {
			http.Error(w, "Name is required", http.StatusBadRequest)
			return
		}

		creatorID, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		req.Group.CreatorID = creatorID

		group, err := group.CreateGroup(db, req.Group, req.ParticipantIDs)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
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

func GetGroupsByUserIDEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			log.Printf("Erreur de validation du token: %v", err)
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		userIDString := chi.URLParam(r, "userID")
		userID, err := strconv.Atoi(userIDString)
		if err != nil {
			log.Printf("Erreur de conversion de l'userID: %v", err)
			http.Error(w, "Invalid User ID", http.StatusBadRequest)
			return
		}

		groups, err := group.GetGroupsByUserID(db, userID)
		if err != nil {
			log.Printf("Erreur lors de la récupération des groupes: %v", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		if len(groups) == 0 {
			log.Printf("Aucun groupe trouvé pour l'utilisateur: %d", userID)
			http.Error(w, "No groups found", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(groups); err != nil {
			log.Printf("Erreur lors de l'encodage des groupes: %v", err)
			http.Error(w, "Failed to encode groups", http.StatusInternalServerError)
			return
		}
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
