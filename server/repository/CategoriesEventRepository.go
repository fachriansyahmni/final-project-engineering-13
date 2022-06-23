package repository

import (
	"database/sql"

	"github.com/rg-km/final-project-engineering-13/entity"
)

type CategoriesEventRepository struct {
	db *sql.DB
}

func NewCategoriesEventRepository(db *sql.DB) CategoryEventRepoInterface {
	return &CategoriesEventRepository{db}
}

func (cer *CategoriesEventRepository) GetCategory() ([]entity.Category_Event, error) {
	categories := []entity.Category_Event{}
	rows, err := cer.db.Query("SELECT id, name FROM categories_event")
	if err != nil {
		return categories, err
	}

	defer rows.Close()

	for rows.Next() {
		var category entity.Category_Event
		err := rows.Scan(
			&category.ID,
			&category.Name,
		)
		if err != nil {
			return categories, err
		}

		categories = append(categories, category)
	}

	return categories, nil
}

func (cer *CategoriesEventRepository) GetCategoryByID(id int) (entity.Category_Event, error) {
	category := entity.Category_Event{}
	row := cer.db.QueryRow("SELECT id, name FROM categories_event WHERE id = ?", id)
	err := row.Scan(
		&category.ID,
		&category.Name,
	)
	if err != nil {
		return category, err
	}

	return category, nil
}
