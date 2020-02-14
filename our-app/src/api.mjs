/*
* run with: 
    npm i --save express
    node --experimental-modules api.mjs

    look for console output for PORT number

    There are two user profiles dummy1 and dummy2 who have two different
    ids 1 and 2 respectively. Any id not > 0 gives an error for all endpoints.
    passwords for dummy users are password1 and password2 respectively.

    Endpoints
    GET: / => "Congrats! You did it!"
    GET: /user => gives array of users
    GET: /user/:id => gives that user if match found on id
    POST: /user => creates a new dummy user if body contains exact dummy information
        stored in variable called user 
    POST: /auth/:id => returns 0 if password matches, 1 if no match
*/


import express from 'express';

const PORT = process.env.PORT || 3001;

var app = express();
var router = express.Router();
var routerUser = express.Router();
var routerAuth = express.Router();

const dummy = {
    firstName: "P.",
    lastName: "Sherman",
    birthDate: 19980225,
    address: "42 Wallaby Lane, Sydney",
    id: 1
};

const dummy2 = {
    firstName: "D.",
    lastName: "Michael",
    birthDate: 19980912,
    address: "1123 North Byrne Rd. Toledo",
    id: 2
};

const middleware = () => {
    console.log('Test MiddleWare');
};

router.get('/', (req, res, next) => {
    res.status(200).send('Congrats! You did it!');

    next();
}, middleware);

routerUser.get('/', (req, res, next) => {
    res.status(200).send([dummy, dummy, dummy, dummy, dummy]);
});

routerUser.get('/:id', (req, res, next) => {
    if (req.params.id > 0) {
        if (req.params.id == 1) {
            res.status(200).send(dummy);
        } else {
            res.status(200).send(dummy2);
        }
    } else {
        res.status(500).send("Error Message");
    }
});

routerUser.post('/', (req, res, next) => {
    // if given full information needed for making a user
    if (req.body.user == dummy) {
        res.status(200).send(dummy);
    } else {
        res.status(500).send("Error Message");
    }
});

routerAuth.post('/:id', (req, res, next) => {
    if (req.params.id > 0) {
        if (req.params.id == 1) {
            if (req.body.password == 'password1') {
                res.status(200).send(0);
            }
            res.status(400).send(1);
        } else {
            if (req.body.password == 'password2') {
                res.status(200).send(0);
            }
            res.status(400).send(1);
        }
    } else {
        res.status(500).send("Bad User Id (must be > 0)");
    }
});

app.use(router);
app.use('/user', routerUser);
app.use('/auth', routerAuth);
app.listen(PORT, () => console.log('server running on port: ' + PORT));