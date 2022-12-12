# Documentation for TodoList api

server api: 195.49.210.34

## create Task
### path: /task/create
### method: POST


body:
```javascript
{
  "task": {
    label: String,
    description: String,
    active: Boolean
  }
}
```

response:
```javascript
{
  label: String,
  description: String,
  active: Boolean,
  _id: String,
  __v: Number
}
```


## get all Tasks
### path: /task/
### method: GET

response:
```javascript
[
  {
    label: String,
    description: String,
    active: Boolean,
    _id: String,
    __v: Number
  },
  {
    label: String,
    description: String,
    active: Boolean,
    _id: String,
    __v: Number
  }
  ...
]
```


## change status to active
### path: /task/active
### method: POST

body:
```javascript
{
  "id": String
}
```

response:
```javascript
{updateInfo}
```

## change status to passive
### path: /task/passive
### method: POST

body:
```javascript
{
  "id": String
}
```

response:
```javascript
{updateInfo}
```

## change task label
### path: /task/label
### method: POST

body:
```javascript
{
  "id": String,
  "label": String
}
```

response:
```javascript
{updateInfo}
```

## change task description
### path: /task/description
### method: POST

body:
```javascript
{
  "id": String,
  "description": String
}
```

response:
```javascript
{updateInfo}
```

## remove task
### path: /task/remove
### method: POST

body:
```javascript
{
  "id": String
}
```

response:
```javascript
{deleteInfo}
```