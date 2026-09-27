package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/pranaydhanke/job-tracker/config"
	"github.com/pranaydhanke/job-tracker/internal/infrastructure/database"
	"github.com/pranaydhanke/job-tracker/internal/platform/logger"
	"github.com/pranaydhanke/job-tracker/internal/routes"
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

	//connect the database
	db, err := database.ConnectDB(cfg.Postgres)
	if err != nil {
		log.Error("Database failed to connect", "Error", err)
		os.Exit(1)
	}
	defer db.Close()

	log.Info("Starting the server")

	//gin http router setup
	router := routes.SetupRoutes()

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

	//after shutdown closing the database connection
	db.Close()

	log.Info("Server Closed")

}
