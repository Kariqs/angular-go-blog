package services

import (
	"context"
	"fmt"
	"mime/multipart"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func UploadImage(file *multipart.FileHeader) (string, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return "", fmt.Errorf("config load: %w", err)
	}

	f, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("file open: %w", err)
	}
	defer f.Close()

	client := s3.NewFromConfig(cfg)
	uploader := manager.NewUploader(client)

	result, err := uploader.Upload(context.TODO(), &s3.PutObjectInput{
		Bucket:      aws.String("kariqs-blog"),
		Key:         aws.String(file.Filename),
		Body:        f,
		ACL:         "public-read",
		ContentType: aws.String(file.Header.Get("Content-Type")),
	})
	if err != nil {
		return "", fmt.Errorf("upload error: %w", err)
	}

	return result.Location, nil
}
