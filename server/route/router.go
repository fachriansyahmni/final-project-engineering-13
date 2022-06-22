package route

import (
	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-13/handler"
)

type Router struct {
	route *gin.Engine
}

func Newrouter(authentication *handler.AuthHandler, userHandler *handler.UserHandler, event *handler.EventHandler) *Router {
	router := &Router{
		route: gin.Default(),
	}

	router.route.Use(gin.Logger())
	router.route.Use(gin.Recovery())

	api := router.route.Group("/api/v1")
	{
		api.Use(handler.SetupAllowOriginMiddleware())
		auth := api.Group("/auth")
		{
			auth.Any("/login", authentication.Login)
			auth.POST("/register", authentication.Register)
			auth.POST("/logout", authentication.Logout)
		}
		ev := api.Group("/event")
		{
			ev.GET("/", event.GetEvent)
			ev.Use(handler.SetupAuthenticationMiddleware())
			ev.POST("/create", event.Create)
			ev.PUT("/update", event.Update)
			ev.DELETE("/delete", event.Delete)
			ev.GET("/my-events", event.MyEvents)
		}

		api.GET("/models", event.GetAllModels)
		api.GET("/categories", event.GetAllCategories)
		api.GET("/types", event.GetAllTypes)

		api.Use(handler.SetupAuthenticationMiddleware())
		api.GET("/profile", userHandler.GetProfile)
		api.PUT("/profile", userHandler.UpdateProfile)
		api.PUT("/password", userHandler.UpdatePassword)
		api.PUT("/photo", userHandler.UpdatePhoto)

	}

	return router
}

func (a *Router) Run(port string) {
	a.route.Run(port)
}
