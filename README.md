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

### Get target User

method: Get
path: /user/${id}

#### status 'OK' response payload model

```javascript

{userData}

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

### Update User

method: POST
path: /user/update

#### body model:
```javascript

{
  filter: { // по этому фильтру мы ищем конкретного пользователя/пользователей которых хотим изменить
    id: String,
    login: String,
    password: String,
    name: String,
    age: Number
    __v: Number
  }
  update: { // обьект содержащий в себе новые параметры пользователя которые мы хотим обновить
    login: String,
    password: String,
    name: String,
    age: Number
  }
}

```

#### status 'OK' response payload model

```javascript

{
  acknowledged: Boolean, required
  modifiedCount: Number, required
  upsertedId: Boolean, required
  upsertedCount: Number, required
  matchedCount: Number, required
}

```

### Delete User

method: POST
path: /user/delete

#### body model:
```javascript

{
  id: String, required // id пользователя которого нужно удалить
}

```

#### status 'OK' response payload model

```javascript

{
  "acknowledged": Boolean, required
	"deletedCount": Number, required
}

```


## Chats

### Get all Chats

method: GET
path: /chat/

#### status 'OK' response payload model

```javascript

[
  {chatData},
  {chatData},
  {chatData}
]

```

### Get target Chat

method: GET
path: /chat/${id}

#### status 'OK' response payload model

```javascript

{chatData}

```

### Get target user chats

method: GET
path: /chat/user/:id

#### status 'OK' response payload model

```javascript
[
  {chatData},
  {chatData},
  {chatData}
]
```


### Send text message to chat

method: POST
path: /chat/send/text

#### body model:
```javascript

{
  login: String, required // login пользователя который отправляет сообщение
  text: String, required // текст самого сообщения
  chatId: String, required // id чата в который отправляется сообщение
}

```

#### status 'OK' response payload model

```javascript
acknowledged: Boolean, required
modifiedCount: Number, required
upsertedId: Boolean, required
upsertedCount: Number, required
matchedCount: Number, required
```

#### status 'Error' response payload model

```javascript

'Не пришел параметр login'
'Не пришел параметр text'
'Не пришел параметр chatId'
'Пользователя с таким логином не существует'

```


### Create new Chat

method: POST
path: /chat/create

#### body model:
```javascript

{
  userId: String, required, // id пользователя который хочет создать новый чат
  label: String, required, // название чата
  members: [userId], required, // массив участников чата
  description: String // описание чата, необязательный параметр!
}

```

#### status 'OK' response payload model

```javascript
acknowledged: Boolean, required
modifiedCount: Number, required
upsertedId: Boolean, required
upsertedCount: Number, required
matchedCount: Number, required
```

#### status 'Error' response payload model

```javascript

'Не пришел параметр userId'
'Не пришел параметр label'
'Не правельный параметр members'
'В чате должно быть хотя бы 2 участника'

```
