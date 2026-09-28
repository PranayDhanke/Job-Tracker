package middleware

import (
	dErr "errors"

	"github.com/gin-gonic/gin"
	"github.com/pranaydhanke/job-tracker/internal/platform/errors"
	"github.com/pranaydhanke/job-tracker/internal/platform/response"
)

// middleware to handle and send the error respose
func ErrorMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Next()

		//check the error length if 0 means no error
		if len(ctx.Errors) == 0 {
			return
		}

		//take the error from reponse error
		err := ctx.Errors.Last().Err

		//take our custum app error pointer
		var appErr *errors.AppError

		//check if error is out custum app error
		if dErr.As(err, &appErr) {
			//send the error response
			response.Error(ctx,
				appErr.StatusCode,
				appErr.Code,
				appErr.Message,
			)
		}

		//if error is not from our custum error
		//send the response as internal server error
		response.Error(ctx,
			500,
			"INTERNAL_SERVER_ERROR",
			"internal server error",
		)

	}
}
