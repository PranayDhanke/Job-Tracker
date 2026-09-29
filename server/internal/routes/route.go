package routes

import (
	"log/slog"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/pranaydhanke/job-tracker/config"
	"github.com/pranaydhanke/job-tracker/internal/platform/middleware"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/redis/go-redis/v9"
)

func SetupRoutes(
	cfg *config.Config,
	log *slog.Logger,
	db *pgxpool.Pool,
	rCon *redis.Client,
) *gin.Engine {
	//initialize the router
	router := gin.New()

	//all midddlwares
	router.Use(
		middleware.RequestID(),
		middleware.LoggerMiddleware(log),
		middleware.Metrics(),
		gin.Recovery(),
		middleware.ErrorMiddleware(),
	)

	//health router
	SetupHealthRoutes(router, db, rCon)

	//metrics route
	router.GET("/metrics", gin.WrapH(promhttp.Handler()))

	//other routes

	return router
}
