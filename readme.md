# Uber Clone

## API Endpoints

### /users/login

This endpoint allows users to log in to the application.

- **URL**: `/users/login`
- **Method**: `POST`
- **Request Body**:
  - `email` (string): The user's email address.
  - `password` (string): The user's password.
- **Response**:
  - `200 OK`: If the login is successful, returns a JSON object with the user's details and a token.
  - `401 Unauthorized`: If the login fails, returns an error message.

```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "user_name",
    "email": "user@example.com"
  }
}
```

### /users/register

This endpoint allows new users to register.

- **URL**: `/users/register`
- **Method**: `POST`
- **Request Body**:
  - `name` (string): The user's name.
  - `email` (string): The user's email address.
  - `password` (string): The user's password.
- **Response**:
  - `201 Created`: If the registration is successful, returns a JSON object with the user's details.
  - `400 Bad Request`: If the registration fails, returns an error message.

```json
{
  "name": "user_name",
  "email": "user@example.com",
  "password": "userpassword"
}
```

```json
{
  "id": "user_id",
  "name": "user_name",
  "email": "user@example.com"
}
```

### /users/logout

This endpoint allows users to log out of the application.

- **URL**: `/users/logout`
- **Method**: `POST`
- **Request Header**:
  - `Authorization` (string): The user's JWT token.
- **Response**:
  - `200 OK`: If the logout is successful, returns a success message.
  - `401 Unauthorized`: If the logout fails, returns an error message.

```json
{
  "message": "Logout successful"
}
```

### /users/profile

This endpoint retrieves the user's profile information.

- **URL**: `/users/profile`
- **Method**: `GET`
- **Request Header**:
  - `Authorization` (string): The user's JWT token.
- **Response**:
  - `200 OK`: If the request is successful, returns a JSON object with the user's profile information.
  - `401 Unauthorized`: If the request fails, returns an error message.

```json
{
  "id": "user_id",
  "name": "user_name",
  "email": "user@example.com",
  "createdAt": "timestamp"
}
```

```json
{
  "error": "Unauthorized"
}
```
