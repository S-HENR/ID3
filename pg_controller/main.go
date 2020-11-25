package main

import (
	"log"
	"net/http"
	"pg-controller/controller"
	"pg-controller/dbinteract"
	"pg-controller/models"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
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

	log.Println("PG controller has started !")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	})

	r := mux.NewRouter()
	r.HandleFunc("/football", controller.GETHandler).Methods("GET")
	r.HandleFunc("/football", controller.POSTHandler).Methods("POST")
	handler := c.Handler(r)
	log.Fatal(http.ListenAndServe(":5000", handler))

}
func init() {
	// Definitely not the best way to do it
	models := []interface{}{
		(*models.PlayFootballID3)(nil),
	}
	db, _ := dbinteract.NewConnection("football")
	db.CreateTable(models)
}
