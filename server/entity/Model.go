package entity

type Model struct {
	ID   int64  `db:"id"`
	Name string `db:"name"`
}
