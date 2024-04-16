package token

import (
	"fmt"
	"log"
	"strings"

	"github.com/dgrijalva/jwt-go"
)

type Claims struct {
	UserId int `json:"userId"`
	jwt.StandardClaims
}

// GenerateToken crée un token JWT
func ValidateTokenAndGetUserID(tokenString string) (int, error) {
	// Vérifier et nettoyer le préfixe "Bearer"
	if strings.HasPrefix(tokenString, "Bearer ") {
		tokenString = strings.TrimPrefix(tokenString, "Bearer ")
	} else {
		return 0, fmt.Errorf("bearer token not found")
	}

	log.Printf("Token after cleaning: %s", tokenString) // Debug

	return GetUserIDFromToken(tokenString)
}

func GetUserIDFromToken(tokenString string) (int, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte("SecretKey"), nil
	})

	if err != nil {
		return 0, fmt.Errorf("error parsing token: %v", err)
	}

	if !token.Valid {
		return 0, fmt.Errorf("invalid token")
	}

	return claims.UserId, nil
}
