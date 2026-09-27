package database

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/pranaydhanke/job-tracker/config"
)

// function to connect the postgres database
func ConnectDB(cfg config.PostgresConfig) (*pgxpool.Pool, error) {
	//context for the database
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	//parse the database url
	pgxCfg, err := pgxpool.ParseConfig(cfg.Url)
	if err != nil {
		return nil, err
	}

	//add the pool config for the database
	pgxCfg.MaxConns = cfg.MaxCon
	pgxCfg.MinConns = cfg.MinCon

	//connect with the database with the pgx config
	pool, err := pgxpool.NewWithConfig(ctx, pgxCfg)
	if err != nil {
		return nil, err
	}

	//check the database connection
	err = pool.Ping(ctx)
	if err != nil {
		return nil, err
	}

	//return the pool
	return pool, nil

}
