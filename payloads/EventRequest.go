package payloads

type EventRequest struct {
	AuthorID        int64  `json:"author_id"`
	Title           string `json:"title"`
	BannerImg       string `json:"bannerImg"`
	Content         string `json:"content"`
	CategoryID      int64  `json:"categoryId"`
	StartTimeEvent  string `json:"startTimeEvent"`
	EndTimeEvent    string `json:"endTimeEvent"`
	StartDateEvent  string `json:"startDateEvent"`
	EndDateEvent    string `json:"endDateEvent"`
	Contact         string `json:"contact"`
	IDPrice         int64  `json:"idPrice"`
	TypeEventID     int64  `json:"typeEventId"`
	LocationDetails string `json:"locationDetails"`
	RegisterUrl     string `json:"registerUrl"`
}
