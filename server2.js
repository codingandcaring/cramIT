/* server2.js express version */

const express = require('express');
const app = express();

let path = require('path');

// needed for images css files ect
app.use(express.static('static'))

// index landing page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/fccategories', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/fccategories.html'));
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

// card functionality list add delete view ect.
app.get('/listCards', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/listCards.html'));
});

//app.post('/', function (req, res) {
//  res.send('Got a POST request')
//})


app.post('/listCards/newCard', function(req, res) {
    res.send('Making a new card eh?');
    //res.sendFile(path.join(__dirname + '/static/cardList.html'));
});

app.listen(3000);
