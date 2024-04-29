# API Docs

## TechStack :

- Node JS (Express JS)
- Sequelize ORM
- Postgres SQL
- JWT
- Bcrypt
- Jest & Supertest

## Getting Started :

- Clone this repository
- put `JWT_SECRET = "ini_secret"` in your env
- `npm i`
- set your database configuration in the config folder (development)
- `npx sequelize db:drop`
- `npx sequelize db:create`
- `npx sequelize db:migrate`
- `npx sequelize db:seed:all`
- `npx nodemon bin/www`

## Endpoints :

- `POST /login`
- `POST /register`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

## 1. POST /login

Request :

- body :

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 2. POST /register

Request:

- body:

```json
{
    "username": "string"
    "email": "string"
    "role": "string"
    "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer"
    "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email is required"
}
OR
{
    "message": "Email format must be an email"
}
OR
{
    "message": "Password is required"
}
OR
{
    "message": "Password must be at least 6 characters long"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid email/password"
}
OR
{
    "message": "This Email is already exist"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 3. GET /products

- Get all products, only authenticated users with admin/staff privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- query:

```json
{
  "search": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 10,
    "name": "mobile 10",
    "userId": 3,
    "createdAt": "2024-04-29T07:40:31.853Z",
    "updatedAt": "2024-04-29T07:40:31.853Z"
  },
  {
    "id": 11,
    "name": "xiaomi a10",
    "userId": 3,
    "createdAt": "2024-04-29T07:42:36.321Z",
    "updatedAt": "2024-04-29T07:42:36.321Z"
  }
  ...,
]
```

&nbsp;

## 4. GET /products/:id

- Get products by id, only authenticated users with admin/staff privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 10,
  "name": "mobile 10",
  "userId": 3,
  "createdAt": "2024-04-29T07:40:31.853Z",
  "updatedAt": "2024-04-29T07:40:31.853Z"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 5. POST /products

- Description:
  This endpoint allows an admin user to create new product. Only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "userId": "integer"
  "createdAt": "integer",
  "updatedAt": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 14,
  "name": "motorola",
  "userId": 3,
  "updatedAt": "2024-04-29T13:35:18.424Z",
  "createdAt": "2024-04-29T13:35:18.424Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Product name is required"
}
OR
{
    "message": "Product with this name already exist"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 6. PUT /products/:id

Description:

- Update products by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success update product by id ${id}"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 7. DELETE /products/:id

Description:

- Delete products by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success delete product by id ${id}"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
