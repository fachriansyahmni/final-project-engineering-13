package service

import (
	"errors"

	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/repository"
	"github.com/rg-km/final-project-engineering-13/securities"
)

type AuthServiceImpl struct {
	userRepo repository.UserRepository
}

func NewAuthService(userRepo repository.UserRepository) AuthService {
	return &AuthServiceImpl{userRepo}
}

func (a *AuthServiceImpl) Login(loginReq payloads.LoginRequest) (string, error) {
	findUser, _ := a.userRepo.GetUserByEmail(loginReq.Email)

	if findUser.Username != "" {
		hashPwd := findUser.Password
		pwd := loginReq.Password

		err := securities.VerifyPassword(hashPwd, pwd)

		if err == nil {
			token, err := securities.GenerateToken(findUser.Email, findUser.ID)

			if err != nil {
				return "", errors.New("GENERATE_TOKEN_FAILED, ERROR: " + err.Error())
			}

			return token, nil
		} else {
			return "", errors.New("PASSWORD_IS_WRONG, ERROR: " + err.Error())
		}
	} else {
		return "", errors.New("USER_NOT_FOUND")
	}
}

func (a *AuthServiceImpl) Register(register payloads.CreateRequest) error {
	findUser, _ := a.userRepo.GetUserByUsername(register.Username)
	if findUser.Username != "" {
		return errors.New("USER_ALREADY_EXIST")
	}

	hash, err := securities.HashPassword(register.Password)
	if err != nil {
		return err
	}

	// register.Username = strings.ToLower(strings.ReplaceAll(register.Username, " ", ""))
	// register.Password = strings.ReplaceAll(register.Password, " ", "")
	register.Password = hash

	err = a.userRepo.CreateUser(register)
	if err != nil {
		return err
	}

	return nil
}
