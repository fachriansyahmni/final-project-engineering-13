package entity

type ListEvent struct {
	ID              int64  `json:"id"`
	Author          string `json:"author"`
	Title           string `json:"title"`
	BannerImg       string `json:"banner_img"`
	Content         string `json:"content"`
	Category        string `json:"category"`
	StartTimeEvent  string `json:"start_time_event"`
	StartDateEvent  string `json:"start_date_event"`
	Contact         string `json:"contact"`
	Price           int64  `json:"price"`
	TypeEvent       string `json:"type_event"`
	Model           string `json:"model"`
	LocationDetails string `json:"location_details"`
	RegisterUrl     string `json:"register_url"`
}
