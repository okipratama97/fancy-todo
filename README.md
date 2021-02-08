# fancy-todo

### GET /todos

> Get all Todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 76,
        "title": "todo-new",
        "description": "nani?!",
        "status": "active",
        "due_date": "2021-02-05T17:00:00.000Z",
        "UserId": 22,
        "createdAt": "2021-02-06T10:41:01.380Z",
        "updatedAt": "2021-02-06T10:41:01.380Z"
    }
]
```

---
### GET /todos/:id

> Get single todo as defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 76,
    "title": "todo-new",
    "description": "nani?!",
    "status": "active",
    "due_date": "2021-02-05T17:00:00.000Z",
    "UserId": 22,
    "createdAt": "2021-02-06T10:41:01.380Z",
    "updatedAt": "2021-02-06T10:41:01.380Z"
}
```

---
### POST /todos

> Create new todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<user input>",
    "description": "<user input>",
    "status": "<user input>",
    "due_date": "<user input>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted input>",
    "description": "<posted input>",
    "status": "<posted input>",
    "due_date": "<posted input>",
    "UserId": "<taken from logged user id>",
    "createdAt": "2021-02-06T10:41:01.380Z",
    "updatedAt": "2021-02-06T10:41:01.380Z"
}
```

---
### PUT /todos/:id

> Update todo defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<user input>",
    "description": "<user input>",
    "status": "<user input>",
    "due_date": "<user input>"
}
```

_Response (200 - OK)_
```
{
    "id": <given id by system>,
    "title": "<posted input>",
    "description": "<posted input>",
    "status": "<posted input>",
    "due_date": "<posted input>",
    "UserId": "<taken from logged user id>",
    "createdAt": "2021-02-06T10:41:01.380Z",
    "updatedAt": "2021-02-06T10:41:01.380Z"
}
```

---
### PATCH /todos/:id

> Update todo status defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "status": "<user input>",
}
```

_Response (200 - OK)_
```
{
    "id": <given id by system>,
    "title": "<posted input>",
    "description": "<posted input>",
    "status": "<posted input>",
    "due_date": "<posted input>",
    "UserId": "<taken from logged user id>",
    "createdAt": "2021-02-06T10:41:01.380Z",
    "updatedAt": "2021-02-06T10:41:01.380Z"
}
```

---
### DELETE /todos/:id

> Delete todo defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": 76,
    "title": "todo-new",
    "description": "nani?!",
    "status": "active",
    "due_date": "2021-02-05T17:00:00.000Z",
    "UserId": 22,
    "createdAt": "2021-02-06T10:41:01.380Z",
    "updatedAt": "2021-02-06T10:41:01.380Z"
}
```

---
### POST /login

> Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<user input>",
    "password": "<user input>",
}
```

_Response (200 - OK)_
```
{
    "access_token": <given access token by system>,
}
```

---
### POST /register

> Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<user input>",
    "password": "<user input>",
    "name": "<user input>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "email": "<posted input>",
}
```

---
### POST /googleLogin

> Login User using google

_Request Header_
```
{
  "token" : "<given access token by system>"
}
```

_Request Body_
```
not needed
```

_Response (200 - Created)_
```
{
    "access_token": <given access token by system>,
}
```

---
### GET /todos/weather

> Get weather from API

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "weather": "Clouds",
    "temp": 22.39,
    "city": "Bandung"
}
```