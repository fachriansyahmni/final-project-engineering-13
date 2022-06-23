package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

// for migration db
func main() {
	db, err := sql.Open("sqlite3", "../../app.db")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`
	

INSERT INTO models(name) VALUES
    ('event seminar'),
    ('beasiswa');

INSERT INTO categories_event(name) VALUES
    ('pendidikan'),
    ('hiburan'),
	('kesehatan'),
	('kuliner');

INSERT INTO type_event(name) VALUES
    ('Online'),
    ('Offline');`)

	if err != nil {
		panic(err)
	}
}
