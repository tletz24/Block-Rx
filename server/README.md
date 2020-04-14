# Server

## Contents

- File Path
- Objects
- Endpoints
- Approach

## File Path

```txt
/server
+---api.js (wrapper for ez calls from client)
+---db.js (db conn func and exports for mongo collections)
+---middleware (basically generic functions used for 'almost' everything)
|  \\---auth.js
+---routes (EVERY SINGLE RESOURCE HAS IT'S OWN FILE)
|   +---index.js (FOR ONLY TESTING AND HOSTING OTHER ROUTERS)
|  \\---user.js (Holds all routes for '/user')
```

## Objects

```js
user_account = {
    firstName: string,
    lastName: string,
    dateOfBirth: string, // no defined format, treated as js' Date()
    password: string, // IS HASHED with SHA or something idc not plaintext tho
    email: string
}

user_demographic = {
				"diseaseDate": "1970-01-01T00:00:00.511Z",
				"ethnicity": 0,
				"diseaseHistory": "",
				"iisPatientId": "",
				"motherFirstName": "",
				"motherMiddleName": "",
				"motherLastName": "",
				"motherMaidenName":  "",
				"countryOfResidence": "",
				"city": "",
				"country": "",
				"state": "",
				"street": "",
				"zip": "",
			  "aliasFirstName": "",
				"aliasLastName": "",
				"aliasMiddleName": "",
				"orderOfBirth": 0,
				"stateOfBirth": "",
				"dateOfBirth": "1970-01-01T00:00:00.511Z",
				"email": "",
				"gender": 0,
				"patientId": "",
				"patientType": 0,
				"multipleBirth": false,
				"primaryLanguage": "EN-US",
				"statusIndicatorProviderLevel": "",
				"jurisdictionLevel": 0,
				"phoneNumber": "",
				"phoneNumberType": 0,
				"protectionIndicator": false,
				"protectionIndicatorDate": "1970-01-01T00:00:00.511Z",
				"race": 0,
				"recallEffectiveDate": "1970-01-01T00:00:00.511Z",
				"recallStatus": false,
				"responsiblePersonFirstName": "",
				"responsiblePersonLastName": "",
				"responsiblePersonMiddleName": "",
				"responsiblePatientRelationship": ""
}
```

## Endpoints

db_info includes everything that was changed and the objects added or removed
please note this will be changing to return only the relevant information
i'll talk to guys about what that includes.

### /login
`POST /login, body=user_login{email, password}`
- 200 => `user{id, email, firstName, lastName, dateOfBirth}`
- 500 => `err{...}`

### /user
`GET /user/:id`
- 200 => `user{id, email, firstName, lastName, dateOfBirth}`
- 500 
  - user dne => `{}`
  - else => `err{...}`

`POST /user, body=user{email, firstName, lastName, dateOfBirth, password}`
- 200 => `{id}` # newly created user id
- 500 => `err{...}`

`POST /user/update, body=user{email, firstName, lastName, dateOfBirth, password}`
- 200 => `update_info{matchedCount, modifiedCount, upsertedCount, upsertedId}`
- 500 => `err{...}`

### /demographic

`GET /demographic/:user_id`
- 200 => Demographic{}
- 404 => Unknown Demographic d for User u (demographic not setup in db)
- 500 => MongoDB Error Message
- 404 => Unknown User u (id not in db)
- 404 => Unknown Demographic d (id not in db) 

`POST /demographic/:user_id body=Demographic{}`
- 404 => Unknown User u
- 404 => Unknown Demographic d
- 200 => Updated Demographic d for User u
- 304 => User u already has matching Demographic d
- 500 => Server Error when checking for modification status(es)

`PUT /demographic/:user_id body=(Demographic{...}|{})`

> **WILL BE REMOVED** only use to add demographic information to a user object. I will be moving this to happen automatically on sign-up.

- 404 => Unknown User u
- 403 => User already has Demographic Information 
- 200 => Added Demographic d to User u
- 304 => User u already has Demographic d (prevents overrites)
- 500 => Error checking mongo updateOne status
- 400 => Error parsing request body into Demographic{}

## Approach

### General

Plan is to have a router corresponding to each resource on the server. e.g. the users resource for managing our users (repetitive) but the router (./server/routes/user.js) will have any information on what endpoints are defined and what functions are called by the server.

### Middleware

### How middleware is called

Middleware is ran IN ORDER OF DEFINITION by the server e.g.

```js
var express = require("express");
var app = express(); // create a new app

app.use("/", MIDDLEWARE_1);
app.use("/also2", MIDDLEWARE_2);
```

Will result in any path calling the MIDDLEWARE_1 function then preceeding to the next function (essentially falliing through). Paths that are `/also2/*` will run MIDDLEWARE_1 then MIDDLEWARE_2 then continue to the `next()` function. `next()` is an express convention that allows fall through. If you're not sure why something is stalling out make sure you have this in your middleware

#### Express middleware definitions

```js

var my_middleware = function (request, response, next) {
    // i have access to all request properties here
    example_data = request.body;
    
    // dont do anything like this with the response it will close the cycle
    // response.status(200).send(example_response);

    // call next to pass control, the next function will be called with 
    // this functions current request and response information
    next();
};
```

I'm going to use an IOC approach to the middleware e.g. this way we can put a place for everything that the app needs to do before we know exactly HOW we are going to implement the validation. ezpz.

```js
var auth = require("./:/auth.js");
var app = express();
// 'user' object could be anything we want it to be later on...
app.use("/", auth(user => someUserValidationFunction(user)));
// currently looks like this
app.use("/", auth(_ => true)); // ignore everything and authenticated=true
```

### Summary

Middleware is what happens for each call on a path routes are what ends the request-response cycle on the server and extra functions (like db access) are stuck in the {router}.js file for right now, these are already extracted so they can be moved easily.
