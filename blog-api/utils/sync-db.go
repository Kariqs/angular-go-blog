package utils

import (
	"log"

	"github.com/Kariqs/blog/blog-api/models"
)

func SyncDatabase() {
	DB.AutoMigrate(&models.Blog{})
	log.Println("Database synced successfully")
}
