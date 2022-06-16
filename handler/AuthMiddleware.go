package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-13/securities"
)

func SetupAuthenticationMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := securities.GetAuthentication(c)

		if err != nil {
			c.JSON(401, gin.H{
				"status":  401,
				"message": err.Error(),
			})
			c.Abort()
			return
		}

		c.Next()
	}
}

func AuthMiddlerware(next gin.HandlerFunc) gin.HandlerFunc {
	return func(c *gin.Context) {
		err := securities.GetAuthentication(c)

		if err != nil {
			c.JSON(401, gin.H{
				"status":  401,
				"message": err.Error(),
			})
			return
		}

		next(c)
	}
}

//setup allow origin
func SetupAllowOriginMiddleware() gin.HandlerFunc {
	allowedHeaders := "text/html; charset=utf-8"
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Content-Type", allowedHeaders)
		if c.Request.Method == "OPTIONS" {
			c.Writer.WriteHeader(http.StatusOK)
		}
		c.Next()
	}
}
