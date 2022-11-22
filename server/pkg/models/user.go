package models

import (
	"server/pkg/config"

	"gorm.io/gorm"
)

var db *gorm.DB

type Users struct{
	gorm.Model
	Fullname string `form:"Fullname" json:"fullname"`
    Username string `gorm:"unique" form:"Username" json:"username"`
    Password string `form:"Password" json:"password"`
    Email    string  `gorm:"unique" form:"Email" json:"email"`
	Profile []byte 	`form:"Profile" json:"profile"`
	Posts []Posts  	`gorm:"foreignKey:UserID;references:ID"`
}

func init()  {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Users{})
}

func (user *Users) RegisterUser() *Users{
	db.Create(&user) 
	return user
}

func (u *Users) LoginUser() *Users{
	db.First(&u, "username = ?", u.Username)
	return u
}

func GetAllUsers() []Users{
	var Users []Users
	db.Find(&Users)
    return Users
}

func GetUserById(id string) (*Users,*gorm.DB){
    var getUser Users
	db := db.Where("ID=?",id).Find(&getUser)
	return &getUser,db
}

func DeleteUser(id string) Users{
    var deleteUser Users
	db.Unscoped().Delete(&Users{}, id)
	return deleteUser
}