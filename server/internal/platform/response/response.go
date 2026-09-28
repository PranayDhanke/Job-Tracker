package response

import "github.com/gin-gonic/gin"

// response struct for the http response
type Response struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *ErrBody    `json:"error,omitempty"`
}

// additional error respose struct
type ErrBody struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

// fucntion for the http success response
func Success(c *gin.Context, status int, data interface{}) {
	c.JSON(status, Response{
		Success: true,
		Data:    data,
	})
}

// function for the http error response
func Error(c *gin.Context, status int, code, message string) {
	c.JSON(status, Response{
		Success: false,
		Error: &ErrBody{
			Code:    code,
			Message: message,
		},
	})
}
