package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/service"
)

type UserHandler struct {
	authService service.UserService
}

func NewUserHandler(authService service.UserService) *UserHandler {
	return &UserHandler{authService: authService}
}

func (a *UserHandler) UpdateProfile(c *gin.Context) {
	var userReq payloads.CreateRequest
	if err := c.ShouldBindJSON(&userReq); err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
		})
		return
	}

	userDetail, _ := c.Get("claims")
	bb := userDetail.(jwt.MapClaims)
	id := int(bb["id"].(float64))

	err := a.authService.UpdateProfile(userReq, id)
	if err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "Update Profile Success",
	})
}

func (a *UserHandler) UpdatePassword(c *gin.Context) {
	var passwordReq payloads.UpdatePasswordRequest
	if err := c.ShouldBindJSON(&passwordReq); err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
		})
		return
	}

	userDetail, _ := c.Get("claims")
	bb := userDetail.(jwt.MapClaims)
	id := int(bb["id"].(float64))

	err := a.authService.UpdatePassword(id, passwordReq)
	if err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "Update Password Success",
	})
}

func (a *UserHandler) UpdatePhoto(c *gin.Context) {
	var photoReq string
	if err := c.ShouldBindJSON(&photoReq); err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
		})
		return
	}

	userDetail, _ := c.Get("claims")
	bb := userDetail.(jwt.MapClaims)
	id := int(bb["id"].(float64))

	err := a.authService.UpdatePhoto(id, photoReq)
	if err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "Update Photo Success",
	})
}

func (a *UserHandler) GetProfile(c *gin.Context) {
	userDetail, _ := c.Get("claims")
	bb := userDetail.(jwt.MapClaims)
	id := int(bb["id"].(float64))

	user, err := a.authService.GetProfile(id)
	if err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "Get Profile Success",
		"data":    user,
	})
}
