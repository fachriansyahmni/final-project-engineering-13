package config

import (
	"database/sql"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

func GetConnection() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "../app.db")
	if err != nil {
		return nil, err
	}

	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(100)
	db.SetConnMaxIdleTime(5 * time.Minute)
	db.SetConnMaxLifetime(60 * time.Minute)

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
