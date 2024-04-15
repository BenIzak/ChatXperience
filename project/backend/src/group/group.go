package group

import (
	"database/sql"
	"log"
	"time"

	"github.com/BenIzak/ChatXperience/project/src/entity"
)

func CreateGroup(db *sql.DB, group entity.Group, participantIDs []int) (*entity.Group, error) {
	tx, err := db.Begin()
	if err != nil {
		log.Printf("Error starting transaction: %v", err)
		return nil, err
	}

	result, err := tx.Exec("INSERT INTO groups (creator_id, name, public, description) VALUES (?, ?, ?, ?)", group.CreatorID, group.Name, group.Public, group.Description)
	if err != nil {
		log.Printf("Error inserting group: %v", err)
		tx.Rollback()
		return nil, err
	}

	groupID, err := result.LastInsertId()
	if err != nil {
		log.Printf("Error getting last insert ID for group: %v", err)
		tx.Rollback()
		return nil, err
	}
	group.ID = int(groupID)

	// Ensure the creator is always a member of the group
	_, err = tx.Exec("INSERT INTO users_groups (user_id, group_id) VALUES (?, ?)", group.CreatorID, groupID)
	if err != nil {
		log.Printf("Error adding creator to users_groups: %v", err)
		tx.Rollback()
		return nil, err
	}

	for _, userID := range participantIDs {
		if userID != group.CreatorID { // Prevent double insertion if the creator is also in participantIDs
			_, err = tx.Exec("INSERT INTO users_groups (user_id, group_id) VALUES (?, ?)", userID, groupID)
			if err != nil {
				log.Printf("Error adding participant to users_groups: %v", err)
				tx.Rollback()
				return nil, err
			}
		}
	}

	if err = tx.Commit(); err != nil {
		log.Printf("Error committing transaction: %v", err)
		return nil, err
	}

	return &group, nil
}

func GetGroupsByUserID(db *sql.DB, userID int) ([]entity.Group, error) {
	var groups []entity.Group

	// SQL query to fetch groups created by the user or where the user is a member.
	query := `
	SELECT DISTINCT g.id, g.creator_id, g.name, g.public, g.description, g.created_at, g.updated_at
	FROM groups g
	LEFT JOIN users_groups ug ON g.id = ug.group_id
	WHERE g.creator_id = YOUR_USER_ID OR ug.user_id = YOUR_USER_ID;
	
			`

	rows, err := db.Query(query, userID, userID)
	if err != nil {
		log.Printf("Error querying groups for user %d: %v", userID, err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var group entity.Group
		if err := rows.Scan(&group.ID, &group.CreatorID, &group.Name, &group.Public, &group.Description, &group.CreatedAt, &group.UpdatedAt); err != nil {
			log.Printf("Error scanning group for user %d: %v", userID, err)
			continue
		}
		groups = append(groups, group)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Error reading groups for user %d: %v", userID, err)
		return nil, err
	}

	return groups, nil
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
