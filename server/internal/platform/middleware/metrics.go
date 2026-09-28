package middleware

import (
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	metrices "github.com/pranaydhanke/job-tracker/internal/metrics"
)

// middleware for the metrics
func Metrics() gin.HandlerFunc {
	return func(c *gin.Context) {

		//get the start time
		start := time.Now()

		//add request being proceed
		metrices.RequestInFlight.Inc()

		c.Next()

		//remoce the request being processed
		metrices.RequestInFlight.Dec()

		//count the duration
		duration := time.Since(start).Seconds()

		//get the route path
		route := c.FullPath()

		//check the route path is empty or not
		if route == "" {
			route = "unknown"
		}

		//get the status
		status := strconv.Itoa(c.Writer.Status())

		//add the count the the total request
		metrices.RequestsTotal.WithLabelValues(
			c.Request.Method,
			route,
			status,
		).Inc()

		//add the request duration in metrics
		metrices.RequestDuration.WithLabelValues(
			c.Request.Method,
			route,
		).Observe(duration)
	}
}
