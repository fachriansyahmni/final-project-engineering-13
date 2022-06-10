package handler

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/repository"
)

type EventHandler struct {
	eventRepo repository.EventRepository
}

func NewEvent(eventRepo repository.EventRepository) *EventHandler {
	return &EventHandler{eventRepo: eventRepo}
}

func (eh *EventHandler) Create(c *gin.Context) {
	var event payloads.EventRequest
	if err := c.ShouldBindJSON(&event); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := eh.eventRepo.Create(&event)
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
