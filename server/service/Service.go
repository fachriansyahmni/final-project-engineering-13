package service

import (
	"github.com/rg-km/final-project-engineering-13/entity"
	"github.com/rg-km/final-project-engineering-13/payloads"
)

type AuthService interface {
	Login(loginReq payloads.LoginRequest) (string, error)
	Register(register payloads.CreateRequest) error
}

type UserService interface {
	UpdateProfile(userReq payloads.CreateRequest, idUser int) error
	UpdatePassword(id int, password string) error
	UpdatePhoto(id int, photo string) error
	GetProfile(id int) (entity.User, error)
	// GetProfileByUsername(username string) (entity.User, error)
	// GetAllProfile() ([]entity.User, error)
	// DeleteProfile(id int64) error
}

type EventService interface {
	Create(event payloads.EventRequest) error
	GetAuthorID(token string) (int, error)
	GetAll() ([]*entity.ListEvent, error)
	GetByID(id int64) (*entity.ListEvent, error)
	Delete(id int64) error
	Update(event entity.Event) error
	GetAllCategory() ([]entity.Category_Event, error)
	GetAllTypeEvent() ([]entity.Type_Event, error)
	GetAllModel() ([]entity.Model, error)
}
