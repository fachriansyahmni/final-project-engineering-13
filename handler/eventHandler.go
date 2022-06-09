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

func (eh *EventHandler) FetchAll(c *gin.Context) {
	events, err := eh.eventRepo.FetchAll()
	if err != nil {
		panic(err)
	}

	c.JSON(200, gin.H{
		"status": "success",
		"data":   events,
	})
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

func (eh *EventHandler) Delete(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	err := eh.eventRepo.Delete(id)

	if err != nil {
		panic(err)
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "success",
	})
}
