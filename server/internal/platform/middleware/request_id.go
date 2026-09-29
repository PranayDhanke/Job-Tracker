package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// request id key
const RequestIDKey = "request_id"

// function for the request id middleware
func RequestID() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		//get the request id from the header if previously available
		requestID := ctx.GetHeader("X-request-ID")

		//check the request if there or not add new
		if requestID == "" {
			requestID = uuid.NewString()
		}

		//set the request id to the context
		ctx.Set(RequestIDKey, requestID)

		//set the header
		ctx.Header("X-Request-ID", requestID)

		//call the next
		ctx.Next()

	}
}
