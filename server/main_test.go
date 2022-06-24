package main_test

import (
	"database/sql"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"

	"github.com/gin-gonic/gin"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	_ "github.com/mattn/go-sqlite3"
	"github.com/rg-km/final-project-engineering-13/config"
	"github.com/rg-km/final-project-engineering-13/handler"
	"github.com/rg-km/final-project-engineering-13/repository"
	"github.com/rg-km/final-project-engineering-13/route"
	"github.com/rg-km/final-project-engineering-13/service"
)

var debe *sql.DB
var serve *gin.Engine

var _ = Describe("Main", func() {
	BeforeEach(func() {
		db, err := sql.Open("sqlite3", "app_test.db")
		if err != nil {
			panic(err)
		}

		db.SetMaxIdleConns(config.Configuration.DB_MAX_IDLE_CONNECTIONS)
		db.SetMaxOpenConns(config.Configuration.DB_MAX_CONNECTIONS)
		db.SetConnMaxIdleTime(config.Configuration.DB_MAX_IDLE_TIME)
		db.SetConnMaxLifetime(config.Configuration.DB_MAX_LIFE_TIME)

		_, err = db.Exec(`
            CREATE TABLE IF NOT EXISTS users (
            id integer not null primary key AUTOINCREMENT,
            username varchar(255) not null,
            first_name varchar(255) not null,
            last_name varchar(255) not null,
            email varchar(255) not null,
            password varchar(255) not null,
            contact varchar(255) not null,
            photo varchar(255),
            created_at varchar(255) not null,
            updated_at varchar(255) not null
        );
		CREATE TABLE IF NOT EXISTS events (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			author_id INTEGER,
			title VARCHAR(255) not null,
			banner_img VARCHAR(255),
			content TEXT not null,
			category_id INTEGER,
			start_time_event DATETIME,
			start_date_event DATE,
			contact VARCHAR(255),
			price INTEGER DEFAULT 0,
			type_event_id INTEGER,
			model_id INTEGER NOT NULL,
			location_details VARCHAR(255),
			register_url VARCHAR(255),
			created_at TIMESTAMP,
			updated_at TIMESTAMP,

			FOREIGN KEY (author_id) REFERENCES users(id),
			FOREIGN KEY (category_id) REFERENCES categories_event(id),
			FOREIGN KEY (type_event_id) REFERENCES type_events(id),
			FOREIGN KEY (model_id) REFERENCES models(id)
			);

		CREATE TABLE IF NOT EXISTS categories_event (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255)
			);

		CREATE TABLE IF NOT EXISTS type_event (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255)
			);

		CREATE TABLE IF NOT EXISTS models (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(50) NOT NULL
			);

			`,
		)

		if err != nil {
			panic(err)
		}
		_, err = db.Exec(`
	

		INSERT INTO models(id,name) VALUES
			(1,'event seminar'),
			(2,'beasiswa');

		INSERT INTO categories_event(id,name) VALUES
			(1,'pendidikan'),
			(2,'hiburan'),
			(3,'kesehatan'),
			(4,'kuliner');

		INSERT INTO type_event(id,name) VALUES
			(1,'Online'),
			(2,'Offline');
			
		INSERT INTO users(username, first_name, last_name, email, password, contact, created_at, updated_at) VALUES
			('user_tes', 'user', 'ruang', 'user_tes@ruangevent.com', '$2a$10$1v2yktmptHYcW1zw8pOzMu/2NqFJAoy4tgKW1BtxQOkBjDgBrvcK.', '081234567890', '2022-06-22 16:00:00', '2022-06-22 16:00:00');
			`)

		if err != nil {
			panic(err)
		}
		debe = db

		router := route.Newrouter(
			handler.NewAuthHandler(service.NewAuthService(repository.NewUserRepo(db))),
			handler.NewUserHandler(service.NewUserService(repository.NewUserRepo(db))),
			handler.NewEventHandler(service.NewEventService(repository.NewEventRepository(db), repository.NewCategoriesEventRepository(db), repository.NewTypeEventRepository(db), repository.NewModelRepository(db))),
		)

		serve = router.Handler()
	})

	AfterEach(func() {
		// Teardown
		db, err := sql.Open("sqlite3", "app_test.db")
		if err != nil {
			panic(err)
		}

		_, err = db.Exec(`
		DROP TABLE IF EXISTS users;
		DROP TABLE IF EXISTS events;
		DROP TABLE IF EXISTS categories_event;
		DROP TABLE IF EXISTS type_event;
		DROP TABLE IF EXISTS models;`)

		if err != nil {
			panic(err)
		}
	})

	Describe("Login credentials are empty", func() {
		When("Email are empty", func() {
			It("should return error", func() {
				w := httptest.NewRecorder()
				bodyReader := strings.NewReader(`{"email": "", "password": "user123"}`)
				r, err := http.NewRequest("POST", "/api/v1/auth/login", bodyReader)
				if err != nil {
					log.Fatal(err)
				}

				serve.ServeHTTP(w, r)
				Expect(w.Code).To(Equal(http.StatusBadRequest))
			})
		})

		When("Password are empty", func() {
			It("should return error", func() {
				w := httptest.NewRecorder()
				bodyReader := strings.NewReader(`{"email": "user_tes@ruangevent.com", "password": ""}`)
				r, err := http.NewRequest("POST", "/api/v1/auth/login", bodyReader)
				if err != nil {
					log.Fatal(err)
				}

				serve.ServeHTTP(w, r)
				Expect(w.Code).To(Equal(http.StatusBadRequest))
			})
		})
	})

	Describe("Login credentials are correct", func() {
		When("Email and Password are correct", func() {
			It("Should return success", func() {
				w := httptest.NewRecorder()
				bodyReader := strings.NewReader(`{"email": "user_tes@ruangevent.com", "password": "user123"}`)
				r, err := http.NewRequest("POST", "/api/v1/auth/login", bodyReader)
				if err != nil {
					log.Fatal(err)
				}

				serve.ServeHTTP(w, r)
				Expect(w.Code).To(Equal(http.StatusOK))
			})
		})
		When("Email and Password are incorrect", func() {
			It("Should failed login when login with user unregistered", func() {
				w := httptest.NewRecorder()
				bodyReader := strings.NewReader(`{"email": "user_unregis@ruangevent.com", "password": "user123"}`)
				r, err := http.NewRequest("POST", "/api/v1/auth/login", bodyReader)
				if err != nil {
					log.Fatal(err)
				}

				serve.ServeHTTP(w, r)
				Expect(w.Code).To(Equal(http.StatusBadRequest))
			})
		})
	})

	Describe("Register credentials are empty", func() {
		When("Email are empty", func() {
			It("should return error", func() {
				w := httptest.NewRecorder()
				bodyReader := strings.NewReader(`
				{
					"username": "user_tes2",
					"email": "",
					"first_name": "user_tes",
					"last_name": "ruang",
					"password": "user123"
				}`)
				r, err := http.NewRequest("POST", "/api/v1/auth/register", bodyReader)
				if err != nil {
					log.Fatal(err)
				}

				serve.ServeHTTP(w, r)
				Expect(w.Code).To(Equal(http.StatusBadRequest))
			})
		})
		When("Password are empty", func() {
			It("should return error", func() {
				w := httptest.NewRecorder()
				bodyReader := strings.NewReader(`
				{
					"username": "user_tes2",
					"email": "user_tes2@ruangevent.com",
					"first_name": "user_tes",
					"last_name": "ruang",
					"password": ""
				}`)
				r, err := http.NewRequest("POST", "/api/v1/auth/register", bodyReader)
				if err != nil {
					log.Fatal(err)
				}

				serve.ServeHTTP(w, r)
				Expect(w.Code).To(Equal(http.StatusBadRequest))
			})
		})
	})

	Describe("Register credentials are correct", func() {
		When("All credential correct", func() {
			It("Should return success", func() {
				w := httptest.NewRecorder()
				bodyReader := strings.NewReader(`
				{
					"username": "user_tes_testing",
					"email": "user_tes_testing@ruangevent.com",
					"first_name": "user_tes",
					"last_name": "ruang",
					"password": "user123"
				}`)
				r, err := http.NewRequest("POST", "/api/v1/auth/register", bodyReader)
				if err != nil {
					log.Fatal(err)
				}
				serve.ServeHTTP(w, r)
				Expect(w.Code).To(Equal(http.StatusOK))
			})
		})
		When("Username already registered", func() {
			It("Should return error code", func() {
				w := httptest.NewRecorder()
				bodyReader := strings.NewReader(`
				{
					"username": "user_tes",
					"email": "user_tes@ruangevent.com",
					"first_name": "user",
					"last_name": "ruang",
					"password": "user123"
				}`)
				r, err := http.NewRequest("POST", "/api/v1/auth/register", bodyReader)
				if err != nil {
					log.Fatal(err)
				}
				serve.ServeHTTP(w, r)
				Expect(w.Code).To(Equal(http.StatusBadRequest))
			})
		})
	})

})
