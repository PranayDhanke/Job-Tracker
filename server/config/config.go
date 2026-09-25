package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
)

// all config struct for the server
type Config struct {
	App      AppConfig
	Postgres PostgresConfig
	Redis    RedisConfig
	Aws      AWSConfig
	Jwt      JWTConfig
}

// server/app config
type AppConfig struct {
	Port string `env:"PORT,required"`     //port for the server
	Env  string `env:"ENV,required"` //env for the server like Production or Development
}

// database config
type PostgresConfig struct {
	Url    string `env:"DATABASE_URL,required"` //we directy putting the url not the parts
	MaxCon int32  `env:"DB_MAX_CONNECTIONS,required"`
	MinCon int32  `env:"DB_MIN_CONNECTIONS,required"`
}

// Redis config
type RedisConfig struct {
	Url string `env:"REDIS_URL,required"` //url to connect with the redis
}

// AWS config for s3
type AWSConfig struct {
	AccessKey string `env:"AWS_ACCESS_KEY_ID,required"`
	SecretKey string `env:"AWS_SECRET_ACCESS_KEY"` //puttin temp
	Region    string `env:"AWS_REGION,required"`
}

// Jwt Config
type JWTConfig struct {
	Secret string `env:"JWT_SECRET,required"`
}

// function to load the config to the server
func LoadConfig() (*Config, error) {
	//go dot env to load the env variables from the local env
	_ = godotenv.Load()

	//config as var
	var cfg Config

	//Parse parses a struct containing `env` tags and loads its values from environment variables.
	if err := env.Parse(&cfg); err != nil {
		return nil, fmt.Errorf("failed to load config: %w", err)
	}

	//return the config
	return &cfg, nil

}
