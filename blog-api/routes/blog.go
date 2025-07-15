package routes

import (
	"github.com/Kariqs/blog/blog-api/handlers"
	"github.com/gofiber/fiber/v2"
)

func RegisterBlogRoutes(router fiber.Router) {
	router.Post("/", handlers.CreateBlogPost)
	router.Get("/", handlers.GetBlogPosts)
	router.Get("/:slug", handlers.GetBlogPost)
}
