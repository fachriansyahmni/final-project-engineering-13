package repository

import (
	"database/sql"
	"time"

	"github.com/rg-km/final-project-engineering-13/entity"
	"github.com/rg-km/final-project-engineering-13/payloads"
)

type EventRepository struct {
	db *sql.DB
}

type EventRepositoryInterface interface {
	Create(a *entity.Event) error
}

func NewEventRepository(db *sql.DB) *EventRepository {
	return &EventRepository{db}
}

func (ar *EventRepository) Create(ev *payloads.EventRequest) error {
	_, err := ar.db.Exec("INSERT INTO events (author_id, title, banner_img, content, category_id, start_time_event, end_time_event, start_date_event, end_date_event, contact, id_price, type_event_id, location_details, register_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		ev.AuthorID,
		ev.Title,
		ev.BannerImg,
		ev.Content,
		ev.CategoryID,
		ev.StartTimeEvent,
		ev.EndTimeEvent,
		ev.StartDateEvent,
		ev.EndDateEvent,
		ev.Contact,
		ev.IDPrice,
		ev.TypeEventID,
		ev.LocationDetails,
		ev.RegisterUrl,
		time.Now(),
		time.Now(),
	)
	if err != nil {
		return err
	}

	return nil
}
