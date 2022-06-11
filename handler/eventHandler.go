package handler

import (
	"strconv"

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

func (eh *EventHandler) GetEvent(c *gin.Context) {
	if c.Query("id") != "" {
		id := c.Query("id")
		idi, _ := strconv.ParseInt(id, 10, 64)
		events, err := eh.eventRepo.GetByID(idi)
		if len(events.Title) == 0 {
			c.JSON(404, gin.H{
				"error": "event not found",
			})
			return
		}
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(200, gin.H{
			"status":  200,
			"message": "success",
			"data":    events,
		})
	} else {
		events, err := eh.eventRepo.GetAll()
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(200, gin.H{
			"status":  200,
			"message": "success",
			"data":    events,
		})
	}
}
