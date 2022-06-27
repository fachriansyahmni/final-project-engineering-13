
# RUANG EVENT

build with go

## Installation
**IMPORTANT!** first run installation, it is required to run the seeder.
1. Install Go Modules
```http
go mod tidy
```
2. Run project
  ```json
  go run .
  ```
2. Run seeder
  ```json
  cd server\config\seeder
  go run .
  ```
3. done


## API Reference

### Login User API
#### Endpoint
```http
  POST /api/v1/login
```

#### Body request example:
```json
{
  "email": "user@ruangevent.com",
  "password": "user123"
}
```

### Register User API
#### Endpoint
```http
  POST /api/v1/register
```

#### Body request example:
```json
{
  "username": "user"
  "first_name": "user",
  "last_name": "ruang",
  "email": "user@ruangevent.com",
  "password": "user123",
}
```

### Get Details My Profile API
#### Request
```http
  GET /api/v1/profile
```

### Update Profile API
#### Request
```http
  PUT /api/v1/profile
```

#### Body request example:
```json
{
  "username": "user",
  "first_name": "user",
  "last_name": "ruang",
  "email": "user@ruangevent.com",
  "contact": "123456789"
}
```

### Update Photo Profile API
#### Request
```http
  PUT /api/v1/photo
```

#### Body request example:
```json
{
  "photo": "www.photo.com"
}
```

### Change Password API
#### Request
```http
  PUT /api/v1/password
```

#### Body request example:
```json
{
  "old_password": "123456",
  "new_password": "654321"
}
```

### Get All Events API
#### Request
```http
  GET /api/v1/event
```

### Get All Events by Model Id API
#### Request
```http
  GET /api/v1/event?model={id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of model to fetch |

### Get All Events by Category Id API
#### Request
```http
  GET /api/v1/event?category={id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of category to fetch |


### Search Event API
#### Endpoint
```http
  GET /api/v1/event?search={keyword}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `keyword`      | `string` | **Required**. keyword of item to fetch |


### Get Details Events API
#### Request
```http
  GET /api/v1/event?id={id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of event to fetch |

### Create Event API
#### Endpoint
```http
  POST /api/v1/event/create
```

#### Body request example:
```json
{
    "title": "ini judul event",
    "banner_img": "https://url_img",
    "content": "ini content event",
    "category_id": 1,
    "start_time_event": "08:00",
    "start_date_event": "2022-01-28",
    "contact" : "#",
    "price" : 0,
    "type_event_id": 1,
    "model_id": 1,
    "location_details": "#",
    "register_url":"#"
}
```

### Update Event API
#### Endpoint
```http
  PUT /api/v1/event/update
```

#### Body request example:
```json
{
    "id": 1,
    "title": "ini event update",
    "banner_img": "https://url_img",
    "content": "isi content",
    "category_id": 2,
    "start_time_event": "08:00",
    "start_date_event": "2022-01-28",
    "contact" : "#",
    "price" : 0,
    "type_event_id":1,
    "model_id": 1,
    "location_details": "#",
    "register_url":"#"
}
```

### Delete Event API
#### Endpoint
```http
  DELETE /api/v1/event/delete
```

#### Body request example:
```json
{
    "id": 1,
}
```

### Get All My Events API
#### Endpoint
```http
  GET /api/v1/event/my-events
```

### Get All Categories API
#### Endpoint
```http
  GET /api/v1/categories
```

show all category of event

### Get All Models API
#### Endpoint
```http
  GET /api/v1/models
```

show all models of event

### Get All Type Event API
#### Endpoint
```http
  GET /api/v1/types
```

show all type of event
