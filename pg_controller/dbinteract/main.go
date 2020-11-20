package dbinteract

import (
	"os"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// PostgresDB is a structure handler to interact with the postgres instsance
type PostgresDB struct {
	db *pg.DB
}

// PostgresDBMethods is an interface handler to define the methods which will allow you to interact with the postgres instance
type PostgresDBMethods interface {
	CreateTable(models []interface{}) error
	InsertItem(item interface{}) error
}

// NewConnection inits a new connection to the targeted postgres instance.
// You also have to target db
func NewConnection(targetDB string) (*PostgresDB, error) {

	target := targetDB
	isUnsafe := os.Getenv("UNSAFE_SSL_PG")

	if isUnsafe == "true" {
		target = target + "?sslmode=disable"
	}

	opt, err := pg.ParseURL(os.Getenv("DATABASE_URL") + "/" + target)
	if err != nil {
		return nil, err
	}

	return &PostgresDB{
		db: pg.Connect(opt),
	}, nil
}

// CreateTable allows to create a table if it doesn't exist.
func (p *PostgresDB) CreateTable(models []interface{}) error {

	for _, model := range models {
		err := p.db.Model(model).CreateTable(&orm.CreateTableOptions{
			Temp:        false,
			IfNotExists: true,
		})
		if err != nil {
			return err
		}
	}
	return nil
}

// InsertItem allows to insert an item in the db, in the table targeted by the structure of the object
func (p *PostgresDB) InsertItem(item interface{}) error {
	_, err := p.db.Model(item).Insert()
	return err
}
