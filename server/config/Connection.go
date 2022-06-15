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
        );
		CREATE TABLE IF NOT EXISTS events (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			author_id INTEGER,
			title VARCHAR(255) not null,
			banner_img VARCHAR(255),
			content TEXT not null,
			category_id INTEGER,
			start_time_event DATETIME,
			end_time_event DATETIME,
			start_date_event DATE,
			end_date_event DATE,
			contact VARCHAR(255),
			id_price INTEGER,
			type_event_id INTEGER,
			location_details VARCHAR(255),
			register_url VARCHAR(255),
			created_at TIMESTAMP,
			updated_at TIMESTAMP,
			
			FOREIGN KEY (author_id) REFERENCES users(id),
			FOREIGN KEY (category_id) REFERENCES categories_event(id),
			FOREIGN KEY (id_price) REFERENCES prices(id),
			FOREIGN KEY (type_event_id) REFERENCES type_events(id)
			);

		CREATE TABLE IF NOT EXISTS categories_event (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255)
			);

		CREATE TABLE IF NOT EXISTS prices (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			price INTEGER DEFAULT 0
			);
	
			`,
	)

	if err != nil {
		panic(err)
	}

	return db, nil
}
