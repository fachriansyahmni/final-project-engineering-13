package utils

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

var (
	validate *validator.Validate
)

func ValidationForm(form interface{}) string {
	validate = validator.New()
	var msg string

	err := validate.Struct(form)

	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			if err.Tag() == "required" {
				msg = fmt.Sprintf("%s cant be empty", err.Field())
			} else if err.Tag() == "min" {
				msg = fmt.Sprintf("%s must have at least 6 characters", err.Field())
			} else if err.Tag() == "email" {
				msg = fmt.Sprintf("%s format not match", err.Field())
			}
		}
	}

	return msg
}
