package repository

import (
	"github.com/rg-km/final-project-engineering-13/entity"
	"github.com/rg-km/final-project-engineering-13/payloads"
)

type UserRepository interface {
	GetUser() ([]entity.User, error)
	GetUserByID(id int64) (entity.User, error)
	GetUserByUsername(username string) (entity.User, error)
	GetUserByEmail(email string) (entity.User, error)
	CreateUser(user payloads.CreateRequest) error
	UpdateUser(user payloads.CreateRequest, idUser int) error
	DeleteUser(id int) error
}

type EventRepoInterface interface {
	GetAll() ([]*entity.ListEvent, error)
	GetByID(id int64) (*entity.ListEvent, error)
	Create(ev *payloads.EventRequest) error
	Delete(id int64) error
	Update(id int64, ev *payloads.EventRequest) error
	ValidateEventUser(eventId, userId int64) error
	ById(id int64) (entity.Event, error)
}
