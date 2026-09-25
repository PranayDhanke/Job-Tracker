package logger

import (
	"log/slog"
	"os"

	"github.com/pranaydhanke/job-tracker/config"
)

// function for the new logger
func NewLogger(cfg config.AppConfig) *slog.Logger {
	//new variable for the slog handler
	var slogHandler slog.Handler

	//if the env is dev then log in text format
	if cfg.Env == "dev" {
		slogHandler = slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
			Level: slog.LevelInfo,
		})
	}

	//if env is prod log in json format
	if cfg.Env == "prod" {
		slogHandler = slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
			Level: slog.LevelInfo,
		})
	}

	//return the logger with handler
	return slog.New(slogHandler)
}
