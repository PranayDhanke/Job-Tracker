package redis

import (
	"context"
	"time"

	"github.com/pranaydhanke/job-tracker/config"
	"github.com/redis/go-redis/v9"
)

// function to connect with the database
func ConnectRedis(cfg config.RedisConfig) (*redis.Conn, error) {
	//parse the redis url for connection
	rOPtion, err := redis.ParseURL(cfg.Url)
	if err != nil {
		return nil, err
	}

	//adding the additional config to the redis
	rOPtion.MaxIdleConns = cfg.MaxIdleConnection
	rOPtion.PoolSize = cfg.PoolSize

	//connect the redis
	rClient := redis.NewClient(rOPtion)

	//context for the redis ping
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	//ping the redis connection
	status := rClient.Ping(ctx)

	//check the ping error
	if status.Err() != nil {
		return nil, status.Err()
	}

	//return the redis client
	return rClient.Conn(), nil
}
