package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/pranaydhanke/job-tracker/internal/handler"
	"github.com/redis/go-redis/v9"
)

func SetupHealthRoutes(router *gin.Engine, db *pgxpool.Pool, redis *redis.Client) {
	//health handler
	handler := handler.NewHealthHandler(db, redis)

	router.GET("/health", handler.Health)
	router.GET("/ready", handler.Ready)
}
