module.exports = (err, _, res, next) => {
  console.log(err, "<<<<<<<:ERROR MASUK")
  console.log(err.name, "<<<<<<:ERROR NAME")
  console.log(err.message, "<<<<<<<:ERROR MSG")
  let statusCode = 500
  let errorCode = "Internal server error"
  let message = "Unexpected error."

  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400
      errorCode = "Validation error"
      let ers = []
      err.errors.forEach(er => {
        ers.push(er.message)
      });
      message = ers
      break;

    case "SequelizeForeignKeyConstraintError":
      statusCode = 400
      errorCode = "Validation error"
      message = err.message
      break;

    case "error_404_todo_not_found":
      statusCode = 404
      errorCode = "Not Found"
      message = "Requested todo was not found"
      break;

    case "error_403_todo_forbidden":
      statusCode = 403
      errorCode = "Forbidden access"
      message = "You cannot access this todo"
      break;

    case "error_401_invalid_token":
      statusCode = 401
      errorCode = "Unauthorized"
      message = "Please login first"
      break;

    case "error_400_no_email_password":
      statusCode = 400
      errorCode = "Validation error"
      message = "Please enter email and password"
      break;

    case "error_400_wrong_email_password":
      statusCode = 400
      errorCode = "Validation error"
      message = "Wrong email or password"
      break;

    case "SequelizeUniqueConstraintError":
      statusCode = 400
      errorCode = "Validation error"
      message = err.errors[0].message
      break;

    default:
      break;
  }

  res.status(statusCode).json({ errorCode, message })
}