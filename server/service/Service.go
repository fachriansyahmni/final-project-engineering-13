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
	UpdateProfile(userReq payloads.UpdateRequest, idUser int) error
	UpdatePassword(id int, password payloads.UpdatePasswordRequest) error
	UpdatePhoto(id int, photo payloads.UpdatePhotoRequest) error
	GetProfile(id int) (entity.User, error)
}

type EventService interface {
	Create(event payloads.EventRequest) error
	GetAuthorID(token string) (int, error)
	GetAll() ([]*entity.ListEvent, error)
	GetByID(id int64) (*entity.ListEvent, error)
	Delete(id int64) error
	Update(event entity.Event) error
}
