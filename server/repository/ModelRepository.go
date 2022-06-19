package repository

import (
	"database/sql"

	"github.com/rg-km/final-project-engineering-13/entity"
)

type ModelRepository struct {
	db *sql.DB
}

func NewModelRepository(db *sql.DB) ModelRepoInterface {
	return &ModelRepository{db}
}

func (m *ModelRepository) GetModelByID(id int) (entity.Model, error) {
	model := entity.Model{}
	row := m.db.QueryRow("SELECT id, name FROM models WHERE id = ?", id)
	err := row.Scan(
		&model.ID,
		&model.Name,
	)
	if err != nil {
		return model, err
	}

	return model, nil
}
