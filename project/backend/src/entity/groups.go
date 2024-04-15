package entity

import "time"

// Group is a struct that represents a group
type Group struct {
	ID           int       `json:"id"`
	CreatorID    int       `json:"creator_id"`
	Name         string    `json:"name"`
	Public       bool      `json:"public"`
	Description  string    `json:"description"`
	Participants []int     `json:"participants"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
