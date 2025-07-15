package services

import (
	"github.com/Kariqs/blog/blog-api/models"
	"github.com/Kariqs/blog/blog-api/utils"
	"gorm.io/gorm"
)

func CreateBlog(blogInfo *models.Blog) *gorm.DB {
	return utils.DB.Create(blogInfo)
}

func GetBlogs(blogs *[]models.Blog, limit int, offset int) *gorm.DB {
	return utils.DB.Limit(limit).Offset(offset).Order("date DESC").Find(blogs)
}

func SearchBlogs(blogs *[]models.Blog, search string) *gorm.DB {
	like := "%" + search + "%"
	return utils.DB.
		Where("title LIKE ? OR slug LIKE ? OR content LIKE ?", like, like, like).
		Order("date DESC").
		Find(blogs)
}

func GetBlogBySlug(blog *models.Blog, slug string) *gorm.DB {
	return utils.DB.Where("slug=?", slug).First(blog)
}
