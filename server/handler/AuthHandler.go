package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/service"
	"github.com/rg-km/final-project-engineering-13/utils"
)

type AuthHandler struct {
	authService service.AuthService
}

func NewAuthHandler(authService service.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (a *AuthHandler) Login(c *gin.Context) {
	var loginReq payloads.LoginRequest
	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
		})
		return
	}

	check := utils.ValidationForm(loginReq)

	if check != "" {
		c.JSON(400, gin.H{
			"status":  400,
			"message": check,
		})
		return
	}

	token, err := a.authService.Login(loginReq)
	if err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
		})
		return
	}

	c.Header("Authorization", "Bearer "+token)
	c.JSON(200, gin.H{
		"status":  200,
		"message": "Login Success",
		"data":    gin.H{"token": token},
	})
}

func (a *AuthHandler) Register(c *gin.Context) {
	var register payloads.CreateRequest
	if err := c.ShouldBindJSON(&register); err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
		})
		return
	}

	check := utils.ValidationForm(register)

	if check != "" {
		c.JSON(400, gin.H{
			"status":  400,
			"message": check,
		})
		return
	}

	err := a.authService.Register(register)
	if err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
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
