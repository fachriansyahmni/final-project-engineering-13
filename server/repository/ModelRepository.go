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

func (m *ModelRepository) GetModels() ([]entity.Model, error) {
	models := []entity.Model{}
	rows, err := m.db.Query("SELECT id, name FROM models")
	if err != nil {
		return models, err
	}

	defer rows.Close()

	for rows.Next() {
		var model entity.Model
		err := rows.Scan(
			&model.ID,
			&model.Name,
		)
		if err != nil {
			return models, err
		}

		models = append(models, model)
	}

	return models, nil
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
