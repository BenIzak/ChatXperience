package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/BenIzak/ChatXperience/project/src/entity"
	"github.com/BenIzak/ChatXperience/project/src/handler"

	"github.com/go-sql-driver/mysql"
)

func main() {
	conf := mysql.Config{
		User:                 "root",
		Passwd:               "root",
		Net:                  "tcp",
		Addr:                 "db",
		DBName:               "xperiencedata",
		AllowNativePasswords: true,
	}

	db, err := sql.Open("mysql", conf.FormatDSN())

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}
	var reference entity.Reference
	reference.User = &entity.User{}
	reference.Group = &entity.Group{}
	reference.UsersGroup = &entity.UsersGroup{}
	reference.Message = &entity.Message{}

	mux := handler.NewHandler(db, reference)

	err = http.ListenAndServe(":3000", mux)
	if err != nil {
		log.Fatalf("could not listen on port 3000: %v", err)
		return
	}
}
