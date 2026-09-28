package errors

// custum app error struct for the normal errors
type AppError struct {
	StatusCode int
	Code       string
	Message    string
}

// function to print the direct message from the error
func (e *AppError) Error() string {
	return e.Message
}

// function for the new custum error
func New(status int, code, message string) *AppError {
	return &AppError{
		StatusCode: status,
		Code:       code,
		Message:    message,
	}
}
