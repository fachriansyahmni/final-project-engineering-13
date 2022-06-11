package handler

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-13/config"
	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/repository"
	"github.com/rg-km/final-project-engineering-13/securities"
)

type EventHandler struct {
	eventRepo repository.EventRepository
}

func NewEvent(eventRepo repository.EventRepository) *EventHandler {
	return &EventHandler{eventRepo: eventRepo}
}

func (eh *EventHandler) GetAuthorID(c *gin.Context) (int, error) {
	token, err := securities.VerifyToken(c)
	if err != nil {
		return 0, err
	}
	if token.Valid {
		claims := &payloads.UserDetailClaims{}
		tknStr := securities.ExtractToken(c)
		tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(config.Configuration.JWT_SECRET), nil
		})
		if err != nil {
			return 0, err
		}

		getClaimData, ok := tkn.Claims.(*payloads.UserDetailClaims)
		if !ok {
			return 0, err
		}

		return getClaimData.ID, nil
	}

	return 0, err
}

func (eh *EventHandler) Create(c *gin.Context) {
	var event payloads.EventRequest
	if err := c.ShouldBindJSON(&event); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	authorId, err := eh.GetAuthorID(c)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	event.AuthorID = int64(authorId)
	err = eh.eventRepo.Create(&event)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "success",
	})
}
