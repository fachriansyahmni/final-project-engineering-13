package config

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func GetConnection() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", Configuration.DB_PATH)
	if err != nil {
		return nil, err
	}

	db.SetMaxIdleConns(Configuration.DB_MAX_IDLE_CONNECTIONS)
	db.SetMaxOpenConns(Configuration.DB_MAX_CONNECTIONS)
	db.SetConnMaxIdleTime(Configuration.DB_MAX_IDLE_TIME)
	db.SetConnMaxLifetime(Configuration.DB_MAX_LIFE_TIME)

	_, err = db.Exec(`
            CREATE TABLE IF NOT EXISTS users (
            id integer not null primary key AUTOINCREMENT,
            username varchar(255) not null,
            first_name varchar(255) not null,
            last_name varchar(255) not null,
            email varchar(255) not null,
            password varchar(255) not null,
            contact varchar(255) not null,
            photo varchar(255) not null,
            created_at varchar(255) not null,
            updated_at varchar(255) not null
        );`,
	)

	if err != nil {
		panic(err)
	}

	return db, nil
}
