package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/pranaydhanke/job-tracker/config"
	"github.com/pranaydhanke/job-tracker/internal/logger"
)

// main function
func main() {

	//global context to catch the system signals for graceful shutdown
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM, syscall.SIGQUIT, syscall.SIGINT)
	defer cancel()

	//loading the config
	cfg, err := config.LoadConfig()
	if err != nil {
		panic(err)
	}

	//adding the logger
	log := logger.NewLogger(cfg.App)

	log.Info("Starting the server")

	//http router setup
	router := gin.Default()
	router.Use(gin.Recovery())

	//health router
	router.GET("health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	// Start serving after all routes have been registered.
	server := &http.Server{
		Addr:    ":" + cfg.App.Port,
		Handler: router,
	}

	//starting the server using a go routing
	go func() {
		log.Info("http server started", "port", cfg.App.Port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Error("server error", "error", err)
		}
	}()

	//catch the shutdown signal
	<-ctx.Done()

	log.Info("Closing the server")

	//creating a shutdown context
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*(time.Second))
	defer cancel()

	//gracefully shutdown the server
	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Error("server shutdown failed", "error", err)
		os.Exit(1)
	}

	log.Info("Server Closed")

}
