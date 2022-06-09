package entity

import "time"

type Event struct {
	ID              int64     `db:"id"`
	AuthorID        int64     `db:"author_id"`
	Title           string    `db:"title"`
	BannerImg       string    `db:"banner_img"`
	Content         string    `db:"content"`
	CategoryID      int64     `db:"category_id"`
	StartTimeEvent  string    `db:"start_time_event"`
	EndTimeEvent    string    `db:"end_time_event"`
	StartDateEvent  string    `db:"start_date_event"`
	EndDateEvent    string    `db:"end_date_event"`
	Contact         string    `db:"contact"`
	IDPrice         int64     `db:"id_price"`
	TypeEventID     int64     `db:"type_event_id"`
	LocationDetails string    `db:"location_details"`
	RegisterUrl     string    `db:"register_url"`
	CreatedAt       time.Time `db:"created_at"`
	UpdatedAt       time.Time `db:"updated_at"`
}
