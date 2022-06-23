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
		db, err := config.GetConnection()
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

	It("Should success login when login with user registered", func() {
		w := httptest.NewRecorder()
		bodyReader := strings.NewReader(`{"username": "user_tes", "password": "user123"}`)
		r, err := http.NewRequest("POST", "/api/v1/auth/login", bodyReader)
		if err != nil {
			log.Fatal(err)
		}

		serve.ServeHTTP(w, r)
		Expect(w.Code).To(Equal(http.StatusOK))
	})

	It("Should failed login when login with user unregistered", func() {
		w := httptest.NewRecorder()
		bodyReader := strings.NewReader(`{"username": "user_unregis", "password": "user123"}`)
		r, err := http.NewRequest("POST", "/api/v1/auth/login", bodyReader)
		if err != nil {
			log.Fatal(err)
		}

		serve.ServeHTTP(w, r)
		Expect(w.Code).To(Equal(http.StatusBadRequest))
	})
})
