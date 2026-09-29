package middleware

import (
	"log/slog"
	"time"

	"github.com/gin-gonic/gin"
)

// func for the logging middleware
func LoggerMiddleware(log *slog.Logger) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		//for the start time for the request log
		start := time.Now()

		// Execute the remaining middleware and handler
		ctx.Next()

		// Calculate request duration
		duration := time.Since(start)

		// Get request ID
		requestID, _ := ctx.Get(RequestIDKey)

		// Get route
		route := ctx.FullPath()
		if route == "" {
			route = ctx.Request.URL.Path
		}

		//http status
		status := ctx.Writer.Status()

		attrs := []any{
			"request_id", requestID,
			"method", ctx.Request.Method,
			"route", route,
			"status", status,
			"duration_ms", float64(duration.Microseconds()) / 1000,
		}

		switch {
		case status >= 500:
			log.ErrorContext(
				ctx.Request.Context(),
				"http request",
				attrs...,
			)

		case status >= 400:
			log.WarnContext(
				ctx.Request.Context(),
				"http request",
				attrs...,
			)

		default:
			log.InfoContext(
				ctx.Request.Context(),
				"http request",
				attrs...,
			)
		}

	}
}
