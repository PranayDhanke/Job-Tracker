package metrices

import "github.com/prometheus/client_golang/prometheus"

// variable for the http metrices
var (
	//variable to count the total requests
	RequestsTotal = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "http_requests_total",
			Help: "Total number of http requests",
		},
		[]string{"method", "route", "status"},
	)

	//variable to count the request duration
	RequestDuration = prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Name: "http_request_duration_secound",
			Help: "HTTP request duration in secound",
		},
		[]string{"method", "route"},
	)

	//varible to count the number of request currently being processed
	RequestInFlight = prometheus.NewGauge(
		prometheus.GaugeOpts{
			Name: "http_request_in_flight",
			Help: "Number of HTTP request currently being processed",
		},
	)
)

// function to register the all above metrics and initalize it
func Register() {
	prometheus.MustRegister(

		//http variables
		RequestsTotal,
		RequestDuration,
		RequestInFlight,

		//database variables
		DBConnectionsTotal,
		DBConnectionsIdle,
		DBConnectionsAcquired,
		DBConnectionsMax,

		//redis variables
		RedisOperationDuration,
		RedisOperationErrors,
		RedisOperationsTotal,
	)
}
