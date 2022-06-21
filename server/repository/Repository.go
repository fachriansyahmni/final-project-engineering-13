package repository

import (
	"github.com/rg-km/final-project-engineering-13/entity"
	"github.com/rg-km/final-project-engineering-13/payloads"
)

type UserRepository interface {
	GetUser() ([]entity.User, error)
	GetUserByID(id int) (entity.User, error)
	GetUserByUsername(username string) (entity.User, error)
	GetUserByEmail(email string) (entity.User, error)
	CreateUser(user payloads.CreateRequest) error
	UpdateUser(user payloads.CreateRequest, idUser int) error
	DeleteUser(id int) error
}

type EventRepoInterface interface {
	GetAll() ([]*entity.ListEvent, error)
	GetByCategory(category_id int64) ([]*entity.ListEvent, error)
	GetByModel(model_id int64) ([]*entity.ListEvent, error)
	GetByID(id int64) (*entity.ListEvent, error)
	Create(ev *payloads.EventRequest) error
	Delete(id int64) error
	Update(id int64, ev *payloads.EventRequest) error
	ValidateEventUser(eventId, userId int64) error
	ById(id int64) (entity.Event, error)
	Search(keyword string) ([]*entity.ListEvent, error)
}

type CategoryEventRepoInterface interface {
	GetCategory() ([]entity.Category_Event, error)
	GetCategoryByID(id int) (entity.Category_Event, error)
}

type TypeEventRepoInterface interface {
	GetTypes() ([]entity.Type_Event, error)
	GetTypeByID(id int) (entity.Type_Event, error)
}

type ModelRepoInterface interface {
	GetModels() ([]entity.Model, error)
	GetModelByID(id int) (entity.Model, error)
}
