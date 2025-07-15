package utils

import (
	"math"
	"regexp"
)

func EstimateReadTime(content string) int {
	re := regexp.MustCompile(`\w+`)
	words := re.FindAllString(content, -1)
	wordCount := len(words)

	wordsPerMinute := 200.0
	
	return int(math.Ceil(float64(wordCount) / wordsPerMinute))
}
