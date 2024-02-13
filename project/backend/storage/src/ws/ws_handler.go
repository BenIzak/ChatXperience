package ws

import (
	"net/http"

	"github.com/benizak/chatxperience/project/src/handlers"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	hub *Hub
}

func NewHandler(h *Hub) *Handler {
	return &Handler{
		hub: h,
	}
}

type CreateRoomReq struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func CreateRoom(handlers handlers.HandlerReference) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req CreateRoomReq
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		Handler.hub.Room[req.ID] = &Room{
			ID:      req.ID,
			Name:    req.Name,
			Clients: make(map[string]*Client),
		}

		c.JSON(http.StatusOK, req)
	}
}
