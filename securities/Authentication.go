package securities

import (
	"fmt"
	"log"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/rg-km/final-project-engineering-13/config"
)

func GetAuthentication(c *gin.Context) error {
	token, err := VerifyToken(c)
	if err != nil {
		log.Println("verify token error: ", err)
		return err
	}

	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		log.Println("claims error: ", err)
		return err
	}

	claims, _ := token.Claims.(jwt.MapClaims)

	c.Set("claims", claims)

	return nil
}

func VerifyToken(c *gin.Context) (*jwt.Token, error) {
	tokenString := ExtractToken(c)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(config.Configuration.JWT_SECRET), nil
	})

	if err != nil {
		return nil, err
	}

	return token, nil
}

func ExtractToken(c *gin.Context) string {
	authHeader := c.Request.Header.Get("Authorization")
	bearerToken := strings.Split(authHeader, " ")

	if len(bearerToken) == 2 {
		return bearerToken[1]
	} else {
		return ""
	}
}
