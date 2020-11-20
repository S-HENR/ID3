package service

import (
	. "pg-controller/dbinteract"
	"pg-controller/models"
)

// SaveNewCase allows to save a new case in db table
func SaveNewCase(newCase *models.PlayFootballID3) error {

	footballDB, err := NewConnection("football")
	if err != nil {
		return err
	}

	models := []interface{}{
		(*models.PlayFootballID3)(nil),
	}

	if err := footballDB.CreateTable(models); err != nil {
		return err
	}

	if err := footballDB.InsertItem(newCase); err != nil {
		return err
	}

	return nil
}
