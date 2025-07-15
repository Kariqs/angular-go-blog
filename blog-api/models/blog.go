package models

import "gorm.io/gorm"

type Blog struct {
	gorm.Model
	Title    string `json:"title"`
	Date     string `json:"date"`
	Slug     string `json:"slug"`
	ReadTime int    `json:"readTime"`
	Content  string `json:"content"`
	ImageUrl string `json:"imageUrl"`
}
