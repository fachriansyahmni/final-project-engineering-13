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

func NewEventRepository(db *sql.DB) EventRepoInterface {
	return &EventRepository{db}
}

func (er *EventRepository) ValidateEventUser(eventId, userId int64) error {
	_, err := er.db.Exec("SELECT id, author_id FROM events WHERE id = ? AND author_id = ?", eventId, userId)
	if err != nil {
		return err
	}

	return nil
}

func (er *EventRepository) ById(eventId int64) (entity.Event, error) {
	event := entity.Event{}
	row := er.db.QueryRow("SELECT id, author_id, title, banner_img, content, category_id, start_time_event, end_time_event, start_date_event, end_date_event, contact, id_price, type_event_id, location_details, register_url, created_at, updated_at FROM events WHERE id = ?", eventId)
	err := row.Scan(
		&event.ID,
		&event.AuthorID,
		&event.Title,
		&event.BannerImg,
		&event.Content,
		&event.CategoryID,
		&event.StartTimeEvent,
		&event.EndTimeEvent,
		&event.StartDateEvent,
		&event.EndDateEvent,
		&event.Contact,
		&event.IDPrice,
		&event.TypeEventID,
		&event.LocationDetails,
		&event.RegisterUrl,
		&event.CreatedAt,
		&event.UpdatedAt,
	)
	if err != nil {
		return event, err
	}

	return event, nil
}

func (er *EventRepository) Create(ev *payloads.EventRequest) error {
	_, err := er.db.Exec("INSERT INTO events (author_id, title, banner_img, content, category_id, start_time_event, end_time_event, start_date_event, end_date_event, contact, id_price, type_event_id, location_details, register_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

func (er *EventRepository) Update(id int64, ev *payloads.EventRequest) error {
	_, err := er.db.Exec("UPDATE events SET title = ?, banner_img = ?, content = ?, category_id = ?, start_time_event = ?, end_time_event = ?, start_date_event = ?, end_date_event = ?, contact = ?, id_price = ?, type_event_id = ?, location_details = ?, register_url = ?, updated_at = ? WHERE id = ?",
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
		id)
	if err != nil {
		return err
	}

	return nil
}

func (er *EventRepository) Delete(id int64) error {
	_, err := er.db.Exec("DELETE FROM events WHERE id = ?", id)
	if err != nil {
		return err
	}

	return nil
}

func (er *EventRepository) GetAll() ([]*payloads.EventRequest, error) {
	rows, err := er.db.Query("SELECT author_id, title, banner_img, content, category_id, start_time_event, end_time_event, start_date_event, end_date_event, contact, id_price, type_event_id, location_details, register_url FROM events")
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var events []*payloads.EventRequest
	for rows.Next() {
		var ev payloads.EventRequest
		err := rows.Scan(&ev.AuthorID, &ev.Title, &ev.BannerImg, &ev.Content, &ev.CategoryID, &ev.StartTimeEvent, &ev.EndTimeEvent, &ev.StartDateEvent, &ev.EndDateEvent, &ev.Contact, &ev.IDPrice, &ev.TypeEventID, &ev.LocationDetails, &ev.RegisterUrl)
		if err != nil {
			return nil, err
		}

		events = append(events, &ev)
	}

	return events, nil
}

func (er *EventRepository) GetByID(id int64) (*payloads.EventRequest, error) {
	row, err := er.db.Query("SELECT author_id, title, banner_img, content, category_id, start_time_event, end_time_event, start_date_event, end_date_event, contact, id_price, type_event_id, location_details, register_url FROM events WHERE id = ?", id)
	if err != nil {
		return nil, err
	}

	defer row.Close()

	var ev payloads.EventRequest
	for row.Next() {
		err := row.Scan(&ev.AuthorID, &ev.Title, &ev.BannerImg, &ev.Content, &ev.CategoryID, &ev.StartTimeEvent, &ev.EndTimeEvent, &ev.StartDateEvent, &ev.EndDateEvent, &ev.Contact, &ev.IDPrice, &ev.TypeEventID, &ev.LocationDetails, &ev.RegisterUrl)
		if err != nil {
			return nil, err
		}
	}
	return &ev, nil
}
