package message

import (
	"database/sql"
	"log"
	"time"

	"github.com/BenIzak/ChatXperience/project/src/entity"
	"github.com/BenIzak/ChatXperience/project/src/user"
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

type messageData struct {
	Message entity.Message
	User    entity.User
}

func GetMessagesByGroupID(db *sql.DB, groupID int) ([]*messageData, error) {
	rows, err := db.Query("SELECT * FROM messages WHERE group_id = ?", groupID)
	if err == sql.ErrNoRows {
		log.Printf("no message in this group")
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	messages := []*messageData{}
	for rows.Next() {
		message := &messageData{}
		var createdAt, updated_at []uint8
		err := rows.Scan(&message.Message.ID, &message.Message.UserID, &message.Message.GroupID, &message.Message.Content, &createdAt, &updated_at)
		if err != nil {
			return nil, err
		}

		createdAtString := string(createdAt)
		message.Message.CreatedAt, err = time.Parse("2006-01-02 15:04:05", createdAtString)
		if err != nil {
			log.Fatal(err)
		}

		updatedAtString := string(updated_at)
		message.Message.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", updatedAtString)
		if err != nil {
			log.Fatal(err)
		}

		message.User, err = user.GetUserByID(db, message.Message.UserID)
		log.Println(message)
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
