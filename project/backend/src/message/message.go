package message

import (
	"database/sql"
	"log"
	"time"

	"github.com/BenIzak/ChatXperience/project/src/entity"
)

func CreateMessage(db *sql.DB, userID int, groupID int, content string) (*entity.Message, error) {
	message := &entity.Message{
		UserID:  userID,
		GroupID: groupID,
		Content: content,
	}

	_, err := db.Exec("INSERT INTO messages (user_id, group_id, content) VALUES (?, ?, ?)", message.UserID, message.GroupID, message.Content)
	if err != nil {
		return nil, err
	}

	return message, nil
}

func GetMessagesByGroupID(db *sql.DB, groupID int) ([]*entity.Message, error) {
	rows, err := db.Query("SELECT * FROM messages WHERE group_id = ?", groupID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	messages := []*entity.Message{}
	for rows.Next() {
		message := &entity.Message{}
		var createdAt, updated_at []uint8
		err := rows.Scan(&message.ID, &message.UserID, &message.GroupID, &message.Content, &createdAt, &updated_at)
		if err != nil {
			return nil, err
		}

		createdAtString := string(createdAt)
		message.CreatedAt, err = time.Parse("2006-01-02 15:04:05", createdAtString)
		if err != nil {
			log.Fatal(err)
		}

		updatedAtString := string(updated_at)
		message.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", updatedAtString)
		if err != nil {
			log.Fatal(err)
		}

		messages = append(messages, message)
	}

	return messages, nil
}

func DeleteMessageByID(db *sql.DB, messageID int) error {
	_, err := db.Exec("DELETE FROM messages WHERE id = ?", messageID)
	if err != nil {
		return err
	}

	return nil
}
