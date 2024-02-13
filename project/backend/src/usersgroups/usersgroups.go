package usersgroups

import (
	"database/sql"

	"github.com/BenIzak/ChatXperience/project/src/entity"
)

func AddUsersGroup(db *sql.DB, userID int, groupID int) (*entity.UsersGroup, error) {
	usersgroup := &entity.UsersGroup{
		UserID:  userID,
		GroupID: groupID,
	}

	_, err := db.Exec("INSERT INTO users_groups (user_id, group_id) VALUES (?, ?)", usersgroup.UserID, usersgroup.GroupID)
	if err != nil {
		return nil, err
	}

	return usersgroup, nil
}

func RemoveUsersGroup(db *sql.DB, userID int, groupID int) error {
	_, err := db.Exec("DELETE FROM users_groups WHERE user_id = ? AND group_id = ?", userID, groupID)
	if err != nil {
		return err
	}

	return nil
}
