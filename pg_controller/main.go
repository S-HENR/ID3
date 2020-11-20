package main

import (
	"log"
	"net/http"
	"pg-controller/controller"

	"github.com/gorilla/mux"
)

func main() {

	// item1 := &models.PlayFootballID3{
	// 	Outlook:      "overcast",
	// 	Temp:         "hot",
	// 	Humidity:     "high",
	// 	Wind:         "weak",
	// 	FriendsAvail: true,
	// 	Homework:     false,
	// 	DayNight:     "day",
	// 	Localisation: "outside",
	// 	Lights:       false,
	// 	InjOrSick:    "no",
	// 	Transport:    "car",
	// 	Result:       true,
	// }

	r := mux.NewRouter()
	r.HandleFunc("/football", controller.GETHandler).Methods("GET")
	r.HandleFunc("/football", controller.POSTHandler).Methods("POST")

	log.Fatal(http.ListenAndServe(":5000", r))

}
