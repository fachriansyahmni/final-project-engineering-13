package handler

import (
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
