/* server2.js express version */

const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const jwt = require('jsonwebtoken');
const db = require('./database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// will change to enviroment variable when deploying
const secret = '1trw_87n$a%rthp'

let path = require('path');

// needed for images css files ect
app.use(express.static('static'));

// useful for grabing data out of post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());


// index landing page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/categories', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/fccategories.html'));
});

app.get('/fcquestions', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/fcquestions.html'));
});

app.get('/interview', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/interview.html'));
});

app.get('/jobsearch', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/jobsearch.html'));
});

app.post('/tokens', function(req, res) {
    //console.log(req.body.password);
    processLogin(req, res);
})

app.post('/signup', function(req, res) {
    createAccount(req, res);
})

// card functionality list add delete view ect.
app.get('/listCards', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/listCards.html'));
});


app.post('/listCards/newCard', function(req, res) {
    res.send('Making a new card eh?');
    //res.sendFile(path.join(__dirname + '/static/cardList.html'));
});

// login related
// Function to Handle Login Request
let processLogin = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    db.findUser('username', username)
        .then((user) => {
            bcrypt.compare(password, user[0].password)
                .then(isValid => {
                    if (isValid) {
                        let token = createToken(user[0]);
                        res.end(token);
                    } else {
                        res.end('No token for you');
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.end('Failed to Login');
                })
        })
};

let createToken = (user) => {
    let token = jwt.sign({ userID: user.ID },
        secret, { expiresIn: '7d' }
    );
    return token
};

//authorizes users to view pages past the login page based on their json webtoken
// Slicing the authorization value as the request.headers will have key value pair as this ... "authorization: Bearer <token>"
let userAuthorization = (request, response) => {
    let { authorization } = request.headers;
    let payload;
    let userID;
    try {
        payload = jwt.verify(authorization.slice(7), secret)
    } catch (err) {
        console.log(err);
    };
    if (payload) {
        return userID = payload.userID;
    }
    return false;
}

let createAccount = (req, res) => {
    let userData = req.body;
    bcrypt.hash(userData.password, saltRounds)
        .then(encryptedPwd => {
            db.insertUser(userData.username, encryptedPwd, userData.location, userData.email)
                .then(() => res.end('New User Stored'))
                .catch(error => {
                    console.log(error);
                    res.end('Failed to store User');
                })
        })
        .catch(error => {
            console.log(error);
            res.end('Failed to generate Hash');
        })
};

app.listen(3000);