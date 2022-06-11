package service

import (
	"github.com/rg-km/final-project-engineering-13/entity"
	"github.com/rg-km/final-project-engineering-13/payloads"
)

type AuthService interface {
	Login(loginReq payloads.LoginRequest) (string, error)
	Register(register payloads.CreateRequest) error
	// Logout(token string) error
}

type UserService interface {
	UpdateProfile(id int64, username, firstName, lastName, email, contact string) error
	UpdatePassword(id int64, password string) error
	UpdatePhoto(id int64, photo string) error
	GetProfile(id int64) (entity.User, error)
	// GetProfileByUsername(username string) (entity.User, error)
	// GetAllProfile() ([]entity.User, error)
	// DeleteProfile(id int64) error
}

type EventService interface {
	Create(event payloads.EventRequest) error
	GetAuthorID(token string) (int, error)
	GetAll() ([]*payloads.EventRequest, error)
	GetByID(id int64) (*payloads.EventRequest, error)
}
