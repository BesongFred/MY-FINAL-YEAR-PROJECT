package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func initDB() {
	var err error
	db, err = sql.Open("sqlite3", "users.db")
	if err != nil {
		log.Fatal(err)
	}

	// Create users table if it doesn't exist
	query := `CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL
	);`
	_, err = db.Exec(query)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Database initialized successfully")
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.ServeFile(w, r, "./index.html")
		return
	}

	email := r.FormValue("email")
	password := r.FormValue("password")

	fmt.Println("Login attempt:", email, password)

	var dbPassword string
	err := db.QueryRow("SELECT password FROM users WHERE email = ?", email).Scan(&dbPassword)
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	if password != dbPassword {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Redirect to homepage on success
	http.Redirect(w, r, "./index.html", http.StatusSeeOther)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./index.html") // Make sure index.html exists
}

func main() {
	initDB()
	defer db.Close()

	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/home", homeHandler)

	fmt.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
