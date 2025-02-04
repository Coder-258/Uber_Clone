# User Registration Endpoint

## POST /users/register

### Description
This endpoint is used to register a new user.

### Request Body
The request body must be a JSON object containing the following fields:
- `email` (string, required): The user's email address. Must be a valid email format.
- `fullName.firstName` (string, required): The user's first name. Must be at least 3 characters long.
- `fullName.lastName` (string, optional): The user's last name. Must be at least 3 characters long if provided.
- `password` (string, required): The user's password. Must be at least 6 characters long.

### Example Request
```json
{
  "email": "user@example.com",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "password": "password123"
}
```

### Response

#### Success (201 Created)
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    }
  },
  "token": "jwt_token"
}
```

### Example Response
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "12345",
    "email": "user@example.com",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    }
  },
  "token": "jwt_token"
}
```

#### Client Errors
- `400 Bad Request`: Missing or invalid fields in the request body.
  ```json
  {
    "error": "All fields are required"
  }
  ```
- `422 Unprocessable Entity`: Validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First Name should be at least 3 characters long",
        "param": "fullName.firstName",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Server Errors
- `500 Internal Server Error`: An error occurred on the server.
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

# User Login Endpoint

## POST /users/login

### Description
This endpoint is used to log in an existing user.

### Request Body
The request body must be a JSON object containing the following fields:
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

### Example Request
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

#### Success (200 OK)
```json
{
  "message": "User logged in successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    }
  },
  "token": "jwt_token"
}
```

### Example Response
```json
{
  "message": "User logged in successfully",
  "user": {
    "id": "12345",
    "email": "user@example.com",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    }
  },
  "token": "jwt_token"
}
```

#### Client Errors
- `400 Bad Request`: Missing or invalid fields in the request body.
  ```json
  {
    "error": "All fields are required"
  }
  ```
- `401 Unauthorized`: Invalid email or password.
  ```json
  {
    "message": "Invalid Email or Password"
  }
  ```

#### Server Errors
- `500 Internal Server Error`: An error occurred on the server.
  ```json
  {
    "error": "Internal Server Error"
  }
  ```
