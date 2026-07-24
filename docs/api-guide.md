# API Documentation & Endpoint Guide

## Base URL
All API v1 endpoints are prefixed with `/api/v1`.

- **Development Base URL**: `http://localhost:5000/api/v1`
- **Interactive Swagger UI**: `http://localhost:5000/api/docs`

---

## Authentication Endpoints

### 1. Register User
- **Method**: `POST`
- **Endpoint**: `/api/v1/auth/register`
- **Request Body**:
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```
- **Response (201 Created)**:
```json
{
  "message": "User registered",
  "user": {
    "id": 1,
    "email": "johndoe@example.com",
    "username": "johndoe"
  }
}
```

### 2. Login User
- **Method**: `POST`
- **Endpoint**: `/api/v1/auth/login`
- **Request Body**:
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```
- **Response (200 OK)**:
```json
{
  "message": "Login successful",
  "token": "<JWT_BEARER_TOKEN>",
  "user": {
    "id": 1,
    "email": "johndoe@example.com",
    "username": "johndoe"
  }
}
```

---

## Posts Endpoints

### 1. Get All Posts
- **Method**: `GET`
- **Endpoint**: `/api/v1/posts`
- **Headers** (optional): `Authorization: Bearer <token>`

### 2. Get Post by ID
- **Method**: `GET`
- **Endpoint**: `/api/v1/posts/:id`

### 3. Create Post
- **Method**: `POST`
- **Endpoint**: `/api/v1/posts`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
```json
{
  "title": "My First Post",
  "content": "Hello world!"
}
```

### 4. Update Post
- **Method**: `PUT`
- **Endpoint**: `/api/v1/posts/:id`
- **Headers**: `Authorization: Bearer <token>`

### 5. Delete Post
- **Method**: `DELETE`
- **Endpoint**: `/api/v1/posts/:id`
- **Headers**: `Authorization: Bearer <token>`

---

## Health Check Endpoint
- **Method**: `GET`
- **Endpoint**: `/api/v1/health`
- **Response**: `{ "status": "ok" }`
