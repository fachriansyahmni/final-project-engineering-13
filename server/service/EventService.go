package service

import (
	"errors"

	"github.com/dgrijalva/jwt-go"
	"github.com/rg-km/final-project-engineering-13/config"
	"github.com/rg-km/final-project-engineering-13/entity"
	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/repository"
)

type EventServiceImpl struct {
	eventRepo repository.EventRepoInterface
}

func NewEventService(eventRepo repository.EventRepoInterface) *EventServiceImpl {
	return &EventServiceImpl{eventRepo}
}

func (e *EventServiceImpl) Validate(event payloads.EventRequest) error {
	if event.Title == "" || event.Content == "" {
		return errors.New("INVALID_DATA")
	}

	return nil
}

func (e *EventServiceImpl) Create(event payloads.EventRequest) error {
	err := e.Validate(event)
	if err != nil {
		return err
	}

	err = e.eventRepo.Create(&event)
	if err != nil {
		return errors.New("EVENT_CREATE_FAILED")
	}

	return nil
}

func (e *EventServiceImpl) Update(event entity.Event) error {
	var eventUpdateReq payloads.EventRequest
	id := event.ID
	eventUpdateReq.AuthorID = event.AuthorID
	eventUpdateReq.Title = event.Title
	eventUpdateReq.BannerImg = event.BannerImg
	eventUpdateReq.Content = event.Content
	eventUpdateReq.CategoryID = event.CategoryID
	eventUpdateReq.StartTimeEvent = event.StartTimeEvent
	eventUpdateReq.Contact = event.Contact
	eventUpdateReq.Price = event.Price
	eventUpdateReq.TypeEventID = event.TypeEventID
	eventUpdateReq.ModelID = event.ModelID
	eventUpdateReq.LocationDetails = event.LocationDetails
	eventUpdateReq.RegisterUrl = event.RegisterUrl

	err := e.Validate(eventUpdateReq)
	if err != nil {
		return err
	}

	err = e.eventRepo.Update(id, &eventUpdateReq)
	if err != nil {
		return errors.New("EVENT_UPDATE_FAILED")
	}

	return nil
}

func (e *EventServiceImpl) Delete(eventId int64) error {
	data, err := e.eventRepo.ById(eventId)
	if err != nil || data.ID != eventId {
		return errors.New("EVENT_NOT_FOUND")
	}

	err = e.eventRepo.Delete(eventId)
	if err != nil {
		return errors.New("EVENT_DELETE_FAILED")
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

func (e *EventServiceImpl) GetAll() ([]*entity.ListEvent, error) {
	result, err := e.eventRepo.GetAll()
	if err != nil {
		return nil, errors.New("NOT_FOUND")
	}

	return result, nil
}

func (e *EventServiceImpl) GetByID(id int64) (*entity.ListEvent, error) {
	result, err := e.eventRepo.GetByID(id)
	if err != nil {
		return nil, errors.New("EVENT_NOT_FOUND")
	}

	return result, nil
}