package service

import (
	"database/sql"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/repository"
	"github.com/rg-km/final-project-engineering-13/securities"
)

var _ = Describe("Repository Test", func() {
	var db *sql.DB
	var err error
	var userRepo repository.UserRepository
	var authService AuthService

	BeforeEach(func() {
		// Setup
		db, err = sql.Open("sqlite3", "./user-test.db")
		if err != nil {
			panic(err)
		}

		_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
            id integer not null primary key AUTOINCREMENT,
            username varchar(255) not null,
            first_name varchar(255) not null,
            last_name varchar(255) not null,
            email varchar(255) not null,
            password varchar(255) not null,
            contact varchar(255),
            photo varchar(255),
            created_at varchar(255) not null,
            updated_at varchar(255) not null
		);
		
		INSERT INTO users (
			username, 
			first_name, 
			last_name, 
			email, 
			password, 
			contact, 
			photo, 
			created_at, 
			updated_at) 
		VALUES (
			"testuser", 
			"test", 
			"user", 
			"user@email.com", 
			"123456", 
			"081234567890", 
			"", 
			"2020-01-01 00:00:00", 
			"2020-01-01 00:00:00"); `)

		if err != nil {
			panic(err)
		}

		userRepo = repository.NewUserRepo(db)
		authService = NewAuthService(userRepo)
	})

	AfterEach(func() {
		// Teardown
		db, err := sql.Open("sqlite3", "./user-test.db")
		if err != nil {
			panic(err)
		}

		_, err = db.Exec(`DROP TABLE IF EXISTS users;`)

		if err != nil {
			panic(err)
		}
	})

	Describe("Login", func() {
		When("username and password are correct", func() {
			It("accepts the login", func() {
				res, err := authService.Login(payloads.LoginRequest{"user@email.com", "123456"})
				token, _ := securities.GenerateToken("user@email.com", 1)
				Expect(err).ToNot(HaveOccurred())
				Expect(res).To(Equal(token))
			})
		})
		When("username is correct but password is incorrect", func() {
			It("rejects the login", func() {
				_, err := authService.Login(payloads.LoginRequest{"user@email.com", "123456"})
				Expect(err).To(HaveOccurred())
				Expect(err.Error()).To(Equal("Login Failed"))
			})
		})
		When("both username and password is incorrect", func() {
			It("rejects the login", func() {
				_, err := authService.Login(payloads.LoginRequest{"user@email.com", "123456"})
				Expect(err).To(HaveOccurred())
				Expect(err.Error()).To(Equal("Login Failed"))
			})
		})
	})
})
