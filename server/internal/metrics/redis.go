package metrices

import (
	"time"

	"github.com/prometheus/client_golang/prometheus"
)

// redis variables
var (
	//to cound the total redis operations
	RedisOperationsTotal = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "redis_operations_total",
			Help: "Total number of Redis operations",
		},
		[]string{"operation"},
	)

	//to count the total number of failed operations
	RedisOperationErrors = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "redis_operation_errors_total",
			Help: "Total number of failed Redis operations",
		},
		[]string{"operation"},
	)

	//to cound the duration for the redis operations
	RedisOperationDuration = prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Name: "redis_operation_duration_seconds",
			Help: "Redis operation duration in seconds",
		},
		[]string{"operation"},
	)
)

//to record the reis operation
func RecordRedisOperation(
	operation string,
	start time.Time,
	err error,
) {
	RedisOperationsTotal.
		WithLabelValues(operation).
		Inc()

	RedisOperationDuration.
		WithLabelValues(operation).
		Observe(time.Since(start).Seconds())

	if err != nil {
		RedisOperationErrors.
			WithLabelValues(operation).
			Inc()
	}
}
