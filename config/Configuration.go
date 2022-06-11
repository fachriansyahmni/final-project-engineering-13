package config

import "time"

var Configuration = struct {
	JWT_SECRET              string
	JWT_EXPIRATION_DURATION time.Duration
	DB_PATH                 string
	DB_MAX_CONNECTIONS      int
	DB_MAX_IDLE_CONNECTIONS int
	DB_MAX_LIFE_TIME        time.Duration
	DB_MAX_IDLE_TIME        time.Duration
}{
	JWT_SECRET:              "secret",
	JWT_EXPIRATION_DURATION: time.Hour * 3,
	DB_PATH:                 "../app.db",
	DB_MAX_CONNECTIONS:      100,
	DB_MAX_IDLE_CONNECTIONS: 10,
	DB_MAX_LIFE_TIME:        60 * time.Minute,
	DB_MAX_IDLE_TIME:        5 * time.Minute,
}
