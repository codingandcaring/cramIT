/* server2.js express version */

const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const jwt = require('jsonwebtoken');
const findUser = require('./database');

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

app.get('/fccategories', function(req, res) {
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



app.post('/login', function (req, res) {
  //res.send('Got a POST request')
  //console.log(req.body.username);
  //console.log(req.body.password);
  processLogin(req, res);
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
    findUser('username', username)
        .then( (user) => {
            console.log(username + " : " + password);
            console.log(user);
            if (user[0].password === password) {
                let token = createToken(user[0]);
                //console.log(token);
                //res.end(token)
                res.redirect('/fccategories');
            } else {
                res.redirect('/');
                //res.end('No token for you');
            }
        })
};

let createToken = (user) => {
    let token = jwt.sign(
    {userID: user.ID},
    secret,
    {expiresIn: '7d' }
    );
    return token
};


app.listen(3000);
