package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "./ruangevent.db")
	if err != nil {
		panic(err)
	}

	defer db.Close()

	_, err = db.Exec(`
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
	`)
	if err != nil {
		panic(err)
	}
}
