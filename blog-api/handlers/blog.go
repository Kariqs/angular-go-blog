package handlers

import (
	"log"
	"math"
	"strconv"

	"github.com/Kariqs/blog/blog-api/models"
	"github.com/Kariqs/blog/blog-api/services"
	"github.com/Kariqs/blog/blog-api/utils"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func CreateBlogPost(ctx *fiber.Ctx) error {
	title := ctx.FormValue("title")
	date := ctx.FormValue("date")
	slug := ctx.FormValue("slug")
	content := ctx.FormValue("content")

	readTime := utils.EstimateReadTime(content)

	file, err := ctx.FormFile("image")
	if err != nil {
		log.Println(err)
		return services.SendErrorResponse(ctx, fiber.StatusBadRequest, "Unable to parse blog image")
	}

	imageURL, err := services.UploadImage(file)
	if err != nil {
		log.Println(err)
		return services.SendErrorResponse(ctx, fiber.StatusInternalServerError, "Failed to upload blog image")
	}

	blog := models.Blog{
		Title:    title,
		Date:     date,
		Slug:     slug,
		ReadTime: readTime,
		Content:  content,
		ImageUrl: imageURL,
	}

	var existingBlog models.Blog
	result := services.GetBlogBySlug(&existingBlog, blog.Slug)

	if result.RowsAffected > 0 {
		return services.SendErrorResponse(ctx, fiber.StatusBadRequest, "A blog with this slug already exists")
	}

	if result := services.CreateBlog(&blog); result.Error != nil {
		log.Println(result.Error)
		return services.SendErrorResponse(ctx, fiber.StatusInternalServerError, "Failed to create blog post")
	}

	return services.SendJSONResponse(ctx, fiber.StatusOK, fiber.Map{
		"message": "Blog Post created successfully",
		"blog":    blog,
	})

}

func GetBlogPosts(ctx *fiber.Ctx) error {
	search := ctx.Query("search", "")

	var result *gorm.DB
	var blogs []models.Blog

	if search != "" {
		if result = services.SearchBlogs(&blogs, search); result.Error != nil {
			log.Println(result.Error)
			return services.SendErrorResponse(ctx, fiber.StatusInternalServerError, "Unable to search blogs")
		}

		return services.SendJSONResponse(ctx, fiber.StatusOK, fiber.Map{
			"blogs":    blogs,
			"metadata": fiber.Map{"search": true, "total": len(blogs)},
		})
	} else {

		page, _ := strconv.Atoi(ctx.Query("page", "1"))
		limit, _ := strconv.Atoi(ctx.Query("limit", "6"))
		offset := (page - 1) * limit

		var count int64
		if err := utils.DB.Model(&models.Blog{}).Count(&count).Error; err != nil {
			log.Println(err)
			return services.SendErrorResponse(ctx, fiber.StatusInternalServerError, "Failed to count blogs")
		}

		if result := services.GetBlogs(&blogs, limit, offset); result.Error != nil {
			log.Println(result.Error)
			return services.SendErrorResponse(ctx, fiber.StatusInternalServerError, "Unable to fetch blogs")
		}

		totalPages := int(math.Ceil(float64(count) / float64(limit)))
		hasPrev := page > 1
		hasNext := page < totalPages

		return services.SendJSONResponse(ctx, fiber.StatusOK, fiber.Map{
			"blogs": blogs,
			"metadata": fiber.Map{
				"total":        count,
				"currentPage":  page,
				"limit":        limit,
				"totalPages":   totalPages,
				"hasPrevPage":  hasPrev,
				"hasNextPage":  hasNext,
				"previousPage": page - 1,
				"nextPage":     page + 1,
			},
		})

	}
}

func GetBlogPost(ctx *fiber.Ctx) error {
	slug := ctx.Params("slug")

	var blog models.Blog
	result := services.GetBlogBySlug(&blog, slug)

	if result.RowsAffected == 0 {
		return services.SendErrorResponse(ctx, fiber.StatusBadRequest, "A blog with this slug does not exist.")
	}

	return services.SendJSONResponse(ctx, fiber.StatusOK, fiber.Map{
		"blog": blog,
	})
}
