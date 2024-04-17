package http

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/BenIzak/ChatXperience/project/src/entity"
	"github.com/BenIzak/ChatXperience/project/src/message"
	"github.com/BenIzak/ChatXperience/project/src/token"
	"github.com/go-chi/chi"
)

func CreateMessageEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		var newmessage entity.Message
		if err := json.NewDecoder(r.Body).Decode(&newmessage); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}

		if newmessage.GroupID == 0 || newmessage.Content == "" {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("UserID, GroupID and Content are required"))
			return
		}

		message, err := message.CreateMessage(db, newmessage.UserID, newmessage.GroupID, newmessage.Content)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		jsonMessage, err := json.Marshal(message)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonMessage)
	}
}

func GetMessagesByGroupIDEndpoint(db *sql.DB) http.HandlerFunc {
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

		messages, err := message.GetMessagesByGroupID(db, groupID)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		jsonMessages, err := json.Marshal(messages)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonMessages)
	}
}

func DeleteMessageByIDEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := token.ValidateTokenAndGetUserID(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		messageIDString := chi.URLParam(r, "messageID")

		messageID, err := strconv.Atoi(messageIDString)
		if err != nil {
			http.Error(w, "Invalid Message ID", http.StatusBadRequest)
			return
		}

		err = message.DeleteMessageByID(db, messageID)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}
