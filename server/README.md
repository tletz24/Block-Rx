# Endpoints

## /login

```txt
POST /login body=user_login{email, password}
- 200 => User{}
- 500 => {message}

curl -i -X POST -H "Content-Type: application/json" --data-binary @curl_objects/l.json localhost:3001/login
```

## /user

```txt
GET /user/:id
- 200 => provider ? [User{}] : User{}
- 500 => {message:string}

curl -i localhost:3001/login/5e5d16e079390d326a9fdaac

///

POST /user body=User{} (exclude demographic field)
- 200 => {id:ObjectId} # newly created user id
- 500 => {message:string}

curl -i -X POST -H "Content-Type: application/json" --data-binary @curl_objects/u.json localhost:3001/user

///

PUT /user/:id body=User{} (exclude demographic field)
- 200 => {updated:bool}
- 500 => {message:string}

curl -i -X PUT -H "Content-Type: application/json" --data-binary @curl_objects/u.json localhost:3001/user/5e5d16e079390d326a9fdaac
```

## /demographic

```txt
GET /demographic/:userId
- 200 => Demographic{}
- 500 => {message:string}

curl -i localhost:3001/demographic/5e5d16e079390d326a9fdaac

///

POST /demographic/:userId
- 200 => {modified:bool}
- 500 => {message}

curl -i -X POST -H "Content-Type: application/json" --data-binary @curl_objects/d.json localhost:3001/demographic/5e5d16e079390d326a9fdaac
```
