package service

import (
	"log"

	"github.com/rg-km/final-project-engineering-13/entity"
	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/repository"
	"github.com/rg-km/final-project-engineering-13/securities"
)

type UserServiceImpl struct {
	userRepo repository.UserRepository
}

func NewUserService(userRepo repository.UserRepository) UserService {
	return &UserServiceImpl{userRepo: userRepo}
}

func (us *UserServiceImpl) UpdateProfile(userReq payloads.CreateRequest, idUser int) error {
	return us.userRepo.UpdateUser(userReq, idUser)
}

func (us *UserServiceImpl) UpdatePassword(id int, passwordReq payloads.UpdatePasswordRequest) error {
	user, err := us.userRepo.GetUserByID(id)
	if err != nil {
		return err
	}

	err = securities.VerifyPassword(user.Password, passwordReq.OldPassword)
	if err != nil {
		return err
	}

	hash, err := securities.HashPassword(passwordReq.NewPassword)
	if err != nil {
		return err
	}

	userReq := payloads.CreateRequest{
		Username:  user.Username,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Password:  hash,
		Contact:   user.Contact,
		Photo:     user.Photo,
	}

	return us.userRepo.UpdateUser(userReq, int(id))
}

func (us *UserServiceImpl) UpdatePhoto(id int, photo string) error {
	user, err := us.userRepo.GetUserByID(id)
	if err != nil {
		return err
	}

	userReq := payloads.CreateRequest{
		Username:  user.Username,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Password:  user.Password,
		Contact:   user.Contact,
		Photo:     photo,
	}

	return us.userRepo.UpdateUser(userReq, int(id))
}

func (us *UserServiceImpl) GetProfile(id int) (entity.User, error) {
	log.Println("GetProfile")
	user, err := us.userRepo.GetUserByID(id)
	return user, err
}
