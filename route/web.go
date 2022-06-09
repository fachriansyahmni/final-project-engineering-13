package route

import (
	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-13/handler"
)

func NewRouter(event *handler.EventHandler) *gin.Engine {
	r := gin.Default()
	apiGroup := r.Group("/api/v1")

	apiGroup.GET("/event", event.FetchAll)
	apiGroup.POST("/event/create", event.Create)
	apiGroup.DELETE("/event/delete/:id", event.Delete)
	return r
}
