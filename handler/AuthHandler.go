package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/service"
)

type AuthHandler struct {
	authService service.AuthService
}

func NewAuthHandler(authService service.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (a *AuthHandler) Login(c *gin.Context) {
	if c.Request.Method == "OPTIONS" {
		c.Writer.WriteHeader(200)
		return
	}

	if c.Request.Method != "POST" {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Method Not Allowed",
		})
		return
	}

	var loginReq payloads.LoginRequest
	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	token, err := a.authService.Login(loginReq)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.Header("Authorization", "Bearer "+token)
	data := map[string]string{"token": token}
	c.JSON(200, gin.H{
		"status":  200,
		"message": "Login Success",
		"data":    data,
	})
}

func (a *AuthHandler) Register(c *gin.Context) {
	var register payloads.CreateRequest
	if err := c.ShouldBindJSON(&register); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := a.authService.Register(register)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "Register Success",
	})
}

func (a *AuthHandler) Logout(c *gin.Context) {
	c.Header("Authorization", "")

	c.JSON(200, gin.H{
		"status":  200,
		"message": "Logout Success",
	})
}
