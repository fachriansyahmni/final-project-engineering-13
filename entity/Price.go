package entity

type Price struct {
	ID    int64 `db:"id"`
	Price int64 `db:"price"`
}
