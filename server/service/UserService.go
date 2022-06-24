package service

import (
	"errors"

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
	user, err := us.userRepo.GetUserByUsername(userReq.Username)
	if err == nil && user.ID != idUser {
		return errors.New("USERNAME ALREADY EXIST")
	}

	user, err = us.userRepo.GetUserByEmail(userReq.Email)
	if err == nil && user.ID != idUser {
		return errors.New("EMAIL ALREADY EXIST")
	}

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

func (us *UserServiceImpl) UpdatePhoto(id int, photo payloads.UpdatePhotoRequest) error {
	return us.userRepo.UpdatePhoto(id, photo.Photo)
}

func (us *UserServiceImpl) GetProfile(id int) (payloads.ProfileRequest, error) {
	user, err := us.userRepo.GetUserByID(id)
	if err != nil {
		return payloads.ProfileRequest{}, errors.New("USER NOT FOUND")
	}
	profileReq := payloads.ProfileRequest{
		Username:  user.Username,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Contact:   user.Contact,
		Photo:     user.Photo,
	}

	return profileReq, nil
}
