package payloads

import "github.com/dgrijalva/jwt-go"

type CreateRequest struct {
	Username  string `json:"username" validate:"required"`
	FirstName string `json:"first_name" validate:"required"`
	LastName  string `json:"last_name" validate:"required"`
	Email     string `json:"email" validate:"required,email"`
	Password  string `json:"password" validate:"required,min=6"`
}

type UpdateRequest struct {
	Username  string `json:"username"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Contact   string `json:"contact"`
}

type ProfileRequest struct {
	Username  string `json:"username"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Contact   string `json:"contact"`
	Photo     string `json:"photo"`
}

type UpdatePasswordRequest struct {
	OldPassword string `json:"old_password" validate:"required"`
	NewPassword string `json:"new_password" validate:"required,min=6"`
}

type UpdatePhotoRequest struct {
	Photo string `json:"photo"`
}
type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type UserDetail struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Authorize string `json:"authorized"`
}

type UserDetailClaims struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Authorize bool   `json:"authorized"`
	jwt.StandardClaims
}
