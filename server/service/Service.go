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
	GetProfile(id int) (payloads.ProfileRequest, error)
}

type EventService interface {
	Create(event payloads.EventRequest) error
	GetAuthorID(token string) (int, error)
	GetAll() ([]*entity.ListEvent, error)
	GetByCategory(category_id int64) ([]*entity.ListEvent, error)
	GetByModel(model_id int64) ([]*entity.ListEvent, error)
	GetByID(id int64) (*entity.ListEvent, error)
	Delete(id int64) error
	Update(event payloads.EventUpdateRequest) error
	GetAllCategory() ([]entity.Category_Event, error)
	GetAllTypeEvent() ([]entity.Type_Event, error)
	GetAllModel() ([]entity.Model, error)
	Search(keyword string) ([]*entity.ListEvent, error)
	GetByAuthor(id int64) ([]*entity.ListEvent, error)
}
