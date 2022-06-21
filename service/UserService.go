package service

import (
	"errors"
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

func (us *UserServiceImpl) UpdateProfile(userReq payloads.UpdateRequest, idUser int) error {
	return us.userRepo.UpdateUser(userReq, idUser)
}

func (us *UserServiceImpl) UpdatePassword(id int, passwordReq payloads.UpdatePasswordRequest) error {
	user, err := us.userRepo.GetUserByID(id)
	if err != nil {
		return errors.New("USER NOT FOUND")
	}

	err = securities.VerifyPassword(user.Password, passwordReq.OldPassword)
	if err != nil {
		return errors.New("OLD PASSWORD IS WRONG")
	}

	hash, err := securities.HashPassword(passwordReq.NewPassword)
	if err != nil {
		return errors.New("HASHING PASSWORD FAILED")
	}

	return us.userRepo.UpdatePassword(id, hash)
}

func (us *UserServiceImpl) UpdatePhoto(id int, photo string) error {
	return us.userRepo.UpdatePhoto(id, photo)
}

func (us *UserServiceImpl) GetProfile(id int) (entity.User, error) {
	log.Println("GetProfile")
	user, err := us.userRepo.GetUserByID(id)
	return user, err
}
