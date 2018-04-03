/ server2.js express version */

const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const jwt = require('jsonwebtoken');
const db = require('./database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// will change to enviroment variable when deploying
// const secret = process.env.secretvarname
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

/* middleware for authorizing users to protect routes */
let loggedIn = function(req, res, next) {
    if (userAuthorization(req, res)) {
        return next();
    } else {
        return res.redirect("/");
    }
};

// index landing page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/categories', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/fccategories.html'));
});

app.get('/fcquestions/:categoryName', function(req, res) {
    var categoryName = req.params.categoryName;
    let authorizedUser = userAuthorization(req, res);
    if (authorizedUser) {
        //console.log('user authorized in fcquestions');
        if (categoryName === 'Random') {
            db.totalCards()
                .then(total => {
                    db.getRandomCards(total)
                        .then(data => {
                            res.end(JSON.stringify(data))
                        });
                });
        } else {
            db.getFlashCards(categoryName)
                .then(data => {
                    res.end(JSON.stringify(data))
                })
                .catch(error => console.log(error));
        }
    }
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
    getFlashCards(req, res);
});

app.get('/newCard', loggedIn, function(req, res) {
    //res.send('Making a new card eh?');
    res.sendFile(path.join(__dirname + '/static/newCard.html'));
});

app.post('/newCard', function(req, res) {
    addQuestion(req, res);
});

app.get('/userpage', function(req, res) {
    // console.log("Coming here for with req headers", req.headers);
    displayUserInformation(req, res);;
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

let displayUserInformation = (req, res) => {
    let username = 'ashley' /////this needs to be replaced with token
    db.findUser('username', username)
        .then((user) => {
            let userInfo = { 'username': user[0].username, 'location': user[0].location, 'email': user[0].email }
            console.log(userInfo)
            res.end(JSON.stringify(userInfo))
        })
        .catch(error => {
            console.log(error);
            res.end('Failed to Find User');
        })
}

//authorizes users to view pages past the login page based on their json webtoken
// Slicing the authorization value as the request.headers will have key value pair as this ... "authorization: Bearer <token>"
let userAuthorization = (request, response) => {
    let { authorization } = request.headers;
    let payload;
    try {
        payload = jwt.verify(authorization.slice(7), secret);
    } catch (err) {
        console.log(err);
    };
    if (payload) {
        console.log('User Authorization', payload.userID);
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

let addQuestion = (req, res) => {
    let questionData = req.body;
    console.log(req.body);
    db.insertQuestion(questionData.category, questionData.question,
            questionData.answer, questionData.difficulty)
        .then(() => res.end('New Question stored'))
        .catch(error => {
            console.log(error);
            res.end('Failed to store User');
        });
};

app.listen(3000);