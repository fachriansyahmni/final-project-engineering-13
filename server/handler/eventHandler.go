package handler

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-13/entity"
	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/securities"
	"github.com/rg-km/final-project-engineering-13/service"
)

type EventHandler struct {
	eventService service.EventService
}

func NewEventHandler(eventService service.EventService) *EventHandler {
	return &EventHandler{eventService: eventService}
}

func (eh *EventHandler) GetAuthorID(c *gin.Context) (int, error) {
	token, err := securities.VerifyToken(c)
	if err != nil {
		return 0, err
	}
	if token.Valid {
		tknStr := securities.ExtractToken(c)
		getClaimData, err := eh.eventService.GetAuthorID(tknStr)
		if err != nil {
			return 0, err
		}

		return getClaimData, nil
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

	err = eh.eventService.Create(event)
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

func (eh *EventHandler) Update(c *gin.Context) {
	var event entity.Event
	if err := c.ShouldBindJSON(&event); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := eh.eventService.Update(event)
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
	var event payloads.EventIdRequest
	if err := c.ShouldBindJSON(&event); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	err := eh.eventService.Delete(event.ID)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "success deleted",
	})

}

func (eh *EventHandler) GetEvent(c *gin.Context) {
	if c.Query("model") != "" {
		mid := c.Query("model")
		mid2, _ := strconv.ParseInt(mid, 10, 64)
		events, err := eh.eventService.GetByModel(mid2)
		if events == nil {
			c.JSON(404, gin.H{
				"error": "model not found",
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
		return
	}

	if c.Query("category") != "" {
		cid := c.Query("category")
		cid2, _ := strconv.ParseInt(cid, 10, 64)
		events, err := eh.eventService.GetByCategory(cid2)
		if events == nil {
			c.JSON(404, gin.H{
				"error": "category not found",
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
		return
	}

	if c.Query("id") != "" {
		id := c.Query("id")
		idi, _ := strconv.ParseInt(id, 10, 64)
		events, err := eh.eventService.GetByID(idi)
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
		return
	}
	events, err := eh.eventService.GetAll()
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

func (eh *EventHandler) GetAllCategories(c *gin.Context) {
	categories, err := eh.eventService.GetAllCategory()
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "success",
		"data":    categories,
	})
}

func (eh *EventHandler) GetAllModels(c *gin.Context) {
	models, err := eh.eventService.GetAllModel()
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "success",
		"data":    models,
	})
}

func (eh *EventHandler) GetAllTypes(c *gin.Context) {
	types, err := eh.eventService.GetAllTypeEvent()
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "success",
		"data":    types,
	})
}
