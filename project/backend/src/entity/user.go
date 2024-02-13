package entity

import "time"

// User is a struct that represents a user
type User struct {
	ID             int       `json:"id"`
	FirstName      string    `json:"firstname"`
	LastName       string    `json:"lastname"`
	Passwd         string    `json:"passwd"`
	Email          string    `json:"email"`
	Connected      bool      `json:"connected"`
	LastConnection time.Time `json:"last_connection"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}
