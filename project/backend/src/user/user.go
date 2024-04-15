package user

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/BenIzak/ChatXperience/project/src/entity"
	"github.com/BenIzak/ChatXperience/project/src/token"
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(db *sql.DB, firstName string, lastName string, password string, email string) (entity.User, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Erreur lors du hashage du mot de passe : %v", err)
		return entity.User{}, fmt.Errorf("could not hash password: %v", err)
	}

	user := entity.User{
		FirstName: firstName,
		LastName:  lastName,
		Passwd:    string(hashedPassword),
		Email:     email,
	}

	_, err = db.Exec("INSERT INTO users (firstname, lastname, pw_hash, email) VALUES (?, ?, ?, ?)", user.FirstName, user.LastName, user.Passwd, user.Email)
	if err != nil {
		log.Printf("Erreur lors de la création de l'utilisateur : %v", err)
		return entity.User{}, fmt.Errorf("could not create user: %v", err)
	}

	return user, err
}

func Login(db *sql.DB, email, password string) (int, string, error) {
	var user entity.User
	err := db.QueryRow("SELECT id, pw_hash FROM users WHERE email = ?", email).Scan(&user.ID, &user.Passwd)
	if err != nil {
		if err == sql.ErrNoRows {
			return 0, "", errors.New("user not found")
		}
		return 0, "", err
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Passwd), []byte(password)) != nil {
		return 0, "", errors.New("invalid password")
	}

	// Create the claims
	claims := &token.Claims{
		UserId: user.ID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 2).Unix(), // Token expires in 2 hours
		},
	}

	// Generate the token
	tk := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := tk.SignedString([]byte("SecretKey"))
	if err != nil {
		return 0, "", err
	}

	return user.ID, tokenString, nil
}

func GetUserByID(db *sql.DB, userID int) (entity.User, error) {
	var user entity.User
	var last_connection, createdAt, updatedAt []uint8

	// Ne sélectionnez que les champs nécessaires
	err := db.QueryRow("SELECT firstname, lastname, email, last_connection, created_at, updated_at FROM users WHERE id = ?", userID).Scan(
		&user.FirstName, &user.LastName, &user.Email, &last_connection, &createdAt, &updatedAt,
	)
	if err != nil {
		log.Printf("Erreur lors de la récupération de l'utilisateur : %v", err)
		return entity.User{}, fmt.Errorf("could not get user: %v", err)
	}

	// Convertir les timestamps
	user.LastConnection, _ = time.Parse("2006-01-02 15:04:05", string(last_connection))
	user.CreatedAt, _ = time.Parse("2006-01-02 15:04:05", string(createdAt))
	user.UpdatedAt, _ = time.Parse("2006-01-02 15:04:05", string(updatedAt))

	return user, nil
}

func GetAllUsers(db *sql.DB) ([]entity.User, error) {
	var users []entity.User
	query := `SELECT id, firstname, lastname, email FROM users`
	rows, err := db.Query(query)
	if err != nil {
		log.Printf("Error querying users: %v", err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user entity.User
		if err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email); err != nil {
			continue // or log the error if needed
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func DeleteUserByID(db *sql.DB, userID int) error {
	_, err := db.Exec("DELETE FROM users WHERE id = ?", userID)
	if err != nil {
		log.Printf("Erreur lors de la suppression de l'utilisateur : %v", err)
		return fmt.Errorf("could not delete user: %v", err)
	}

	return err
}

func UpdateUserByID(db *sql.DB, userID int, firstName string, lastName string, password string, email string) (entity.User, error) {
	user, err := GetUserByID(db, userID)
	if err != nil {
		log.Printf("Erreur lors de la récupération de l'utilisateur : %v", err)
		return entity.User{}, fmt.Errorf("could not get user: %v", err)
	}

	if password != "" {
		if bcrypt.CompareHashAndPassword([]byte(user.Passwd), []byte(password)) != nil {
			fmt.Printf("password is the same as the old one %v", err)
			return entity.User{}, errors.New("password is the same as the old one")
		}
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		if err != nil {
			log.Printf("Erreur lors du hashage du mot de passe : %v", err)
			return entity.User{}, fmt.Errorf("could not hash password: %v", err)
		}
		user.Passwd = string(hashedPassword)
	}

	if firstName != "" {
		user.FirstName = firstName
	}

	if lastName != "" {
		user.LastName = lastName
	}

	if email != "" {
		user.Email = email
	}

	_, err = db.Exec("UPDATE users SET firstname = ?, lastname = ?, pw_hash = ?, email = ?, updated_at = ? WHERE id = ?", user.FirstName, user.LastName, user.Passwd, user.Email, time.Now(), userID)
	if err != nil {
		log.Printf("Erreur lors de la mise à jour de l'utilisateur : %v", err)
		return entity.User{}, fmt.Errorf("could not update user: %v", err)
	}

	return user, err
}
