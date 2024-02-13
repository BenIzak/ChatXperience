package entity

import "time"

// UsersGroup is a struct that represents a user group
type UsersGroup struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id"`
	GroupID   int       `json:"group_id"`
	CreatedAt time.Time `json:"created_at"`
}
