package group

import (
	"database/sql"
	"log"
	"time"

	"github.com/BenIzak/ChatXperience/project/src/entity"
)

func CreateGroup(db *sql.DB, creatorID int, name string, public bool, description string) (*entity.Group, error) {
	group := &entity.Group{
		CreatorID:   creatorID,
		Name:        name,
		Public:      public,
		Description: description,
	}

	_, err := db.Exec("INSERT INTO groups (creator_id, name, public, description) VALUES (?, ?, ?, ?)", group.CreatorID, group.Name, group.Public, group.Description)
	if err != nil {
		return nil, err
	}

	return group, nil
}

func GetGroupByID(db *sql.DB, groupID int) (*entity.Group, error) {
	group := &entity.Group{}

	var createdAt, updatedAt []uint8

	err := db.QueryRow("SELECT id, creator_id, name, public, description, created_at, updated_at FROM groups WHERE id = ?", groupID).Scan(&group.ID, &group.CreatorID, &group.Name, &group.Public, &group.Description, &createdAt, &updatedAt)
	if err != nil {
		return nil, err
	}

	createdAtString := string(createdAt)
	group.CreatedAt, err = time.Parse("2006-01-02 15:04:05", createdAtString)
	if err != nil {
		log.Fatal(err)
	}

	updatedAtString := string(updatedAt)
	group.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", updatedAtString)
	if err != nil {
		log.Fatal(err)
	}

	return group, nil
}

func UpdateGroupByID(db *sql.DB, groupID int, name string, public bool, description string) (*entity.Group, error) {
	group := &entity.Group{
		ID:          groupID,
		Name:        name,
		Public:      public,
		Description: description,
	}

	_, err := db.Exec("UPDATE groups SET name = ?, public = ?, description = ? WHERE id = ?", group.Name, group.Public, group.Description, group.ID)
	if err != nil {
		return nil, err
	}

	return group, nil
}

func DeleteGroupByID(db *sql.DB, groupID int) error {
	_, err := db.Exec("DELETE FROM groups WHERE id = ?", groupID)
	if err != nil {
		return err
	}

	return nil
}
