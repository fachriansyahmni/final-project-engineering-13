package payloads

import "github.com/dgrijalva/jwt-go"

type CreateRequest struct {
	Username  string `json:"username"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type UpdateRequest struct {
	Username  string `json:"username"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Contact   string `json:"contact"`
}

type UpdatePasswordRequest struct {
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}

type UpdatePhotoRequest struct {
	Photo string `json:"photo"`
}
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
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

// type UserDetail struct {
// 	ID        string `json:"id"`
// 	Username  string `json:"username"`
// 	Authorize string `json:"authorized"`
// }
