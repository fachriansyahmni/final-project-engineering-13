package payloads

type EventRequest struct {
	AuthorID        int64  `json:"author_id"`
	Title           string `json:"title"`
	BannerImg       string `json:"banner_img"`
	Content         string `json:"content"`
	CategoryID      int64  `json:"category_id"`
	StartTimeEvent  string `json:"start_time_event"`
	StartDateEvent  string `json:"start_date_event"`
	Contact         string `json:"contact"`
	Price           int64  `json:"price"`
	TypeEventID     int64  `json:"type_event_id"`
	ModelID         int64  `json:"model_id"`
	LocationDetails string `json:"location_details"`
	RegisterUrl     string `json:"register_url"`
}

type EventIdRequest struct {
	ID int64 `json:"id"`
}

type SearchRequest struct {
	Search string `json:"search"`
}
