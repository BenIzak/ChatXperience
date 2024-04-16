package usersgroups

import (
	"database/sql"

	"github.com/BenIzak/ChatXperience/project/src/entity"
	"github.com/BenIzak/ChatXperience/project/src/user"
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

	return err
}

func GetUsersByGroupID(db *sql.DB, groupID int) ([]entity.User, error) {
	rows, err := db.Query("SELECT user_id FROM users_groups WHERE group_id = ?", groupID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var userIDs []int

	for rows.Next() {
		var userID int
		err := rows.Scan(&userID)
		if err != nil {
			return nil, err
		}
		userIDs = append(userIDs, userID)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	var userData entity.User
	var users []entity.User
	for _, userID := range userIDs {
		userData, err = user.GetUserByID(db, userID)
		if err != nil {
			return nil, err
		}
		users = append(users, userData)
	}

	return users, nil
}
