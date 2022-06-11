package securities

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/rg-km/final-project-engineering-13/config"
)

func GenerateToken(username string, id int) (string, error) {
	timer := time.Now().Add(config.Configuration.JWT_EXPIRATION_DURATION).Unix()
	secret := config.Configuration.JWT_SECRET
	claims := jwt.MapClaims{}

	claims["authorized"] = true
	claims["id"] = id
	claims["username"] = username
	claims["exp"] = timer

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(secret))

	if err != nil {
		return "", err
	}

	return tokenString, err
}
