package entity

import "time"

// Message is a struct that represents a message
type Message struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id"`
	GroupID   int       `json:"group_id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
