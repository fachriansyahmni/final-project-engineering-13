package route

import (
	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-13/handler"
)

type Router struct {
	route *gin.Engine
}

func Newrouter(authentication *handler.AuthHandler, event *handler.EventHandler) *Router {
	router := &Router{
		route: gin.Default(),
	}

	router.route.Use(gin.Logger())
	router.route.Use(gin.Recovery())

	api := router.route.Group("/api/v1")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/login", authentication.Login)
			auth.POST("/register", authentication.Register)
			auth.POST("/logout", authentication.Logout)
		}

		ev := api.Group("/event")
		{
			ev.GET("/", event.GetEvent)
			ev.POST("/create", handler.AuthMiddlerware(event.Create))
		}
	}

	return router
}

func (a *Router) Run(port string) {
	a.route.Run(port)
}
