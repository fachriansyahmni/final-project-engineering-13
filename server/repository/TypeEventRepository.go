package repository

import (
	"database/sql"

	"github.com/rg-km/final-project-engineering-13/entity"
)

type TypeEventRepository struct {
	db *sql.DB
}

func NewTypeEventRepository(db *sql.DB) TypeEventRepoInterface {
	return &TypeEventRepository{db}
}

func (t *TypeEventRepository) GetTypes() ([]entity.Type_Event, error) {
	type_events := []entity.Type_Event{}
	rows, err := t.db.Query("SELECT id, name FROM type_event")
	if err != nil {
		return type_events, err
	}

	defer rows.Close()

	for rows.Next() {
		var type_event entity.Type_Event
		err := rows.Scan(
			&type_event.ID,
			&type_event.Name,
		)
		if err != nil {
			return type_events, err
		}

		type_events = append(type_events, type_event)
	}

	return type_events, nil
}

func (t *TypeEventRepository) GetTypeByID(id int) (entity.Type_Event, error) {
	type_event := entity.Type_Event{}
	row := t.db.QueryRow("SELECT id, name FROM type_event WHERE id = ?", id)
	err := row.Scan(
		&type_event.ID,
		&type_event.Name,
	)
	if err != nil {
		return type_event, err
	}

	return type_event, nil
}
