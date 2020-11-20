package models

// PlayFootballID3 describes an item in db
type PlayFootballID3 struct {
	ID           int64
	Outlook      string `json:"outlook"`
	Temp         string `json:"temp"`
	Humidity     string `json:"humidity"`
	Wind         string `json:"wind"`
	FriendsAvail bool   `json:"friends_avail" pg:",use_zero" sql:",notnull"`
	Homework     bool   `json:"homework" pg:",use_zero" sql:",notnull"`
	DayNight     string `json:"day_night"`
	Localisation string `json:"localisation"`
	Lights       bool   `json:"lights" pg:",use_zero" sql:",notnull"`
	InjSick      string `json:"inj_sick"`
	Transport    string `json:"transport"`
	Result       bool   `json:"result" pg:",use_zero" sql:",notnull"`
}
