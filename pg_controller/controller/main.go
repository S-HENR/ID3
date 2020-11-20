package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"pg-controller/models"
	"pg-controller/service"
)

// GETHandler is the handler for GET requests
func GETHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
}

// POSTHandler is the handler for POST requests
func POSTHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var playFootballID3Item *models.PlayFootballID3

	if err := json.NewDecoder(r.Body).Decode(&playFootballID3Item); err != nil {
		http.Error(w, err.Error(), http.StatusNotAcceptable)
		return
	}

	log.Println(playFootballID3Item)

	if err := service.SaveNewCase(playFootballID3Item); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
