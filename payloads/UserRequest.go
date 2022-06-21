package payloads

type CreateRequest struct {
	Username  string `json:"username"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Contact   string `json:"contact"`
	Photo     string `json:"photo"`
}

type UpdateRequest struct {
	Username  string `json:"username"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Contact   string `json:"contact"`
	Photo     string `json:"photo"`
}

type UpdatePasswordRequest struct {
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// type UserDetail struct {
// 	ID        string `json:"id"`
// 	Username  string `json:"username"`
// 	Authorize string `json:"authorized"`
// }
