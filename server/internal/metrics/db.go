package metrices

import (
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/prometheus/client_golang/prometheus"
)

// variable for the database metrics
var (
	//to cound the total connections
	DBConnectionsTotal = prometheus.NewGauge(
		prometheus.GaugeOpts{
			Name: "db_connections_total",
			Help: "Current number of PostgreSQL connections in the pool",
		},
	)

	//to to current idle connections
	DBConnectionsIdle = prometheus.NewGauge(
		prometheus.GaugeOpts{
			Name: "db_connections_idle",
			Help: "Current number of idle PostgreSQL connections",
		},
	)

	//to cound the current acquired connections
	DBConnectionsAcquired = prometheus.NewGauge(
		prometheus.GaugeOpts{
			Name: "db_connections_acquired",
			Help: "Current number of acquired PostgreSQL connections",
		},
	)

	//to cound the max db connections
	DBConnectionsMax = prometheus.NewGauge(
		prometheus.GaugeOpts{
			Name: "db_connections_max",
			Help: "Maximum number of PostgreSQL connections allowed",
		},
	)
)

// function to update the db metrics
func UpdateDBMetrics(db *pgxpool.Pool) {
	stat := db.Stat()

	DBConnectionsTotal.Set(float64(stat.TotalConns()))
	DBConnectionsIdle.Set(float64(stat.IdleConns()))
	DBConnectionsAcquired.Set(float64(stat.AcquiredConns()))
	DBConnectionsMax.Set(float64(stat.MaxConns()))
}

// to count the db metrics we run the goroutine function
func StartDBMetrics(db *pgxpool.Pool) {
	go func() {
		ticker := time.NewTicker(5 * time.Second)
		defer ticker.Stop()

		for range ticker.C {
			UpdateDBMetrics(db)
		}
	}()
}
