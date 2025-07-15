package services

import "github.com/gofiber/fiber/v2"

func SendErrorResponse(ctx *fiber.Ctx, statusCode int, errorMessage string) error {
	return ctx.Status(statusCode).JSON(fiber.Map{
		"message": errorMessage,
	})
}

func SendJSONResponse(ctx *fiber.Ctx, statusCode int, response fiber.Map) error {
	return ctx.Status(statusCode).JSON(response)
}
