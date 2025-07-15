package main

import (
	"log"
	"os"
	"time"

	"github.com/Kariqs/blog/blog-api/routes"
	"github.com/Kariqs/blog/blog-api/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func init() {
	utils.LoadEnvVariables()
	utils.ConnectToDatabase()
	utils.SyncDatabase()
}

func main() {
	app := fiber.New(fiber.Config{
		AppName:      "Blog Posts",
		IdleTimeout:  30 * time.Second,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	app.Use(cors.New(cors.Config{
		AllowOrigins: "https://mesh-art-gallery-ui.vercel.app/, http://localhost:4200",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	api := app.Group("/api")
	routes.RegisterBlogRoutes(api.Group("/blog"))

	log.Printf("Server running on port %s", port)
	log.Fatal(app.Listen(":" + port))
	app.ShutdownWithTimeout(30 * time.Second)
}
