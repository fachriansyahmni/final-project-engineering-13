package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
	"github.com/rg-km/final-project-engineering-13/handler"
	"github.com/rg-km/final-project-engineering-13/repository"
	"github.com/rg-km/final-project-engineering-13/route"
)

func main() {
	db, err := sql.Open("sqlite3", "./config/ruangevent.db")
	if err != nil {
		panic(err)
	}

	defer db.Close()

	eventHandler := handler.NewEvent(*repository.NewEventRepository(db))

	router := route.NewRouter(eventHandler)
	router.Run(":8090")
}
