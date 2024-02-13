package token

import (
	"fmt"

	"github.com/dgrijalva/jwt-go"
)

type Claims struct {
	UserId int `json:"userId"`
	jwt.StandardClaims
}

func ValidateTokenAndGetUserID(tokenString string) (int, error) {
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte("SecretKey"), nil
	})
	if err != nil {
		return 0, err
	}

	if !token.Valid {
		return 0, fmt.Errorf("invalid token")
	}

	return claims.UserId, nil
}
