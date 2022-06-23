package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-13/securities"
)

func SetupAuthenticationMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := securities.GetAuthentication(c)

		if err != nil {
			c.JSON(403, gin.H{
				"status_code": 403,
				"message":     err.Error(),
			})
			c.Abort()
			return
		}

		c.Next()
	}
}

//setup allow origin
func SetupAllowOriginMiddleware() gin.HandlerFunc {
	allowedHeaders := "application/json"
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Content-Type", allowedHeaders)
		if c.Request.Method == "OPTIONS" {
			c.Writer.WriteHeader(200)
		}
		c.Next()
	}
}
