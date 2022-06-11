package service

import (
	"errors"

	"github.com/dgrijalva/jwt-go"
	"github.com/rg-km/final-project-engineering-13/config"
	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/repository"
)

type EventServiceImpl struct {
	eventRepo repository.EventRepoInterface
}

func NewEventService(eventRepo repository.EventRepoInterface) *EventServiceImpl {
	return &EventServiceImpl{eventRepo}
}

func (e *EventServiceImpl) Create(event payloads.EventRequest) error {
	err := e.eventRepo.Create(&event)
	if err != nil {
		return errors.New("EVENT_CREATE_FAILED")
	}

	return nil
}

func (e *EventServiceImpl) GetAuthorID(token string) (int, error) {
	claims := &payloads.UserDetailClaims{}
	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.Configuration.JWT_SECRET), nil
	})
	if err != nil {
		return 0, err
	}

	authorData, ok := tkn.Claims.(*payloads.UserDetailClaims)
	if !ok {
		return 0, err
	}
	return authorData.ID, nil
}

func (e *EventServiceImpl) GetAll() ([]*payloads.EventRequest, error) {
	result, err := e.eventRepo.GetAll()
	if err != nil {
		return nil, errors.New("NOT_FOUND")
	}

	return result, nil
}

func (e *EventServiceImpl) GetByID(id int64) (*payloads.EventRequest, error) {
	result, err := e.eventRepo.GetByID(id)
	if err != nil {
		return nil, errors.New("EVENT_NOT_FOUND")
	}

	return result, nil
}
