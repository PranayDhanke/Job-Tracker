package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pranaydhanke/job-tracker/internal/platform/middleware"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func SetupRoutes() *gin.Engine {
	//initialize the router
	router := gin.Default()

	//all midddlwares
	router.Use(
		gin.Logger(),
		gin.Recovery(),
		middleware.ErrorMiddleware(),
		middleware.Metrics(),
	)

	// / route
	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"Status": "Running",
		})
	})

	//health router
	router.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	//metrics route
	router.GET("/metrics", gin.WrapH(promhttp.Handler()))

	//other routes

	return router
}
