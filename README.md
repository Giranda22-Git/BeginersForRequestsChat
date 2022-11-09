# API Documentation

### serverIp: 195.49.210.34

### Response model for All Requests

```javascript

{
  info: {
    status: 'OK' | 'Error',
    headRequest: String,
    body: Object,
    count: Number,
    leadTime: String
  },
  payload: Object | Array | String | Number | Boolean | Float
}

```

## Users

### Get all Users

method: GET
path: /user/

#### status 'OK' response payload model

```javascript

[
  {userData},
  {userData},
  {userData}
]

```

### Register new User

method: POST
path: /user/registration

#### body model:
```javascript

{
  userData: {
    login: String, required
    password: String, required
    tryPassword: String, required
    name: String
    age: Number
  }
}

```

#### status 'OK' response payload model

```javascript

{
  login: String, required,
  password: String, required,
  name: String,
  age: Number,
  __v: Number,
  _id: String
}

```

#### status 'Error' response payload model

```javascript

'Пользователь с таким логином уже существует'
'Пароль пустой, а он обязателен!!!'
'Логин меньше 6 символов'
'Пароли не совпадают'
'Пароль меньше 6 символов'

```

### Authorization User

method: POST
path: /user/authorization

#### body model:
```javascript

{
  userData: {
    login: String, required
    password: String, required
  }
}

```

#### status 'OK' response payload model

```javascript

{
  login: String, required,
  password: String, required,
  name: String,
  age: Number,
  __v: Number,
  _id: String
}

```
