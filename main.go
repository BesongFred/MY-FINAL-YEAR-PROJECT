package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
	"github.com/gorilla/sessions"
)

// Session store
var store = sessions.NewCookieStore([]byte("super-secret-key"))

// Database connection
func initDB() *sql.DB {
	db, err := sql.Open("sqlite3", "users.db")
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

	// Insert a test user (Email: test@example.com, Password: password123)
	_, err = db.Exec("INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)", "test@example.com", "password123")
	if err != nil {
		log.Fatal(err)
	}

	return db
}

var db *sql.DB

// Render HTML pages
func renderTemplate(w http.ResponseWriter, tmpl string, data interface{}) {
	tmplPath := fmt.Sprintf("templates/%s", tmpl)
	t, err := template.ParseFiles(tmplPath)
	if err != nil {
		http.Error(w, "Template rendering error", http.StatusInternalServerError)
		return
	}
	t.Execute(w, data)
}

// Login page handler
func loginPage(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "login.html", nil)
}

// Handle login submission
func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	email := r.FormValue("email")
	password := r.FormValue("password")

	var dbPassword string
	err := db.QueryRow("SELECT password FROM users WHERE email = ?", email).Scan(&dbPassword)
	if err != nil || password != dbPassword {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Create session
	session, _ := store.Get(r, "session")
	session.Values["authenticated"] = true
	session.Save(r, w)

	// Redirect to home page
	http.Redirect(w, r, "/index.html", http.StatusSeeOther)
}

// Logout handler
func logoutHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session")
	session.Values["authenticated"] = false
	session.Save(r, w)
	http.Redirect(w, r, "/login", http.StatusSeeOther)
}

// Home page (protected)
func homePage(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session")
	auth, ok := session.Values["authenticated"].(bool)

	if !ok || !auth {
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	renderTemplate(w, "index.html", nil)
}

func main() {
	db = initDB()
	defer db.Close()

	// Routes
	http.HandleFunc("/login", loginPage)
	http.HandleFunc("/auth", loginHandler)
	http.HandleFunc("/logout", logoutHandler)
	http.HandleFunc("/home", homePage)

	// Start server
	fmt.Println("Server running at http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
