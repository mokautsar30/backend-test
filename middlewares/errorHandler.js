module.exports = function errorHandler(error, req, res, next) {
  let statusCode = 500;
  let message = "Internal Server Error";

  switch (error.name) {
    case "EmailIsRequired":
      statusCode = 400;
      message = "Email is required";
      break;
    case "UsernameIsRequired":
      statusCode = 400;
      message = "Username is required";
      break;

    case "PasswordIsRequired":
      statusCode = 400;
      message = "Password is required";
      break;

    case "ExistingEmail":
      statusCode = 400;
      message = "email already exist";
      break;

    case "UserNotExist":
    case "PasswordInvalid":
      statusCode = 401;
      message = "Invalid email / password";
      break;

    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = error.errors[0].message;
      break;

    case "ErrorNotFound":
      statusCode = 404;
      message = "Data not found";
      break;

    case "ForbiddenAccess":
      statusCode = 403;
      message = "Forbidden Access";
      break;
  }

  res.status(statusCode).json({ message });
};
