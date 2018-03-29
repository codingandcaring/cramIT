const http = require('http');
const fs = require('fs');
const readDir = require('fs-readdir-promise');
const promisify = require('util').promisify;
const jwt = require('jsonwebtoken');
const findUser = require('./db');

const readFile = promisify(fs.readFile);
const express = require('express');
const app = express();
const db = require('./db.js');
const fcCategoryFileName = 'fccategories.html'
const secret = '1trw_87n$a%rthp'



//Function to get post data from front end
let getTextFromServer = (request, callback) => {
    let body = ''
    request.on('data', (chunk) => {
        body += chunk.toString();
    });
    request.on('end', () => {
        callback(body);
    });
};

// Function to Handle Login Request
let processLogin = (request, response, params) => {
    getTextFromServer((request), (body) => {
        let credentials = JSON.parse(body);
        let { username, password } = credentials;
        findUser('username', username)
        .then( (user) => {
            if (user[0].password === password) {
                let token = createToken(user[0]);
                response.end(token)
            } else { 
                response.end('No token for you');
            }  
        })

    })
};

let createToken = (user) => {
    let token = jwt.sign(
    {userID: user.id},
    secret,
    {expiresIn: '7d' }
    );
    return token
};

let userAuthorization = (request, response) => {
    let { authorization } = request.headers;
    let payload;
    let userID;
    try {
        payload = jwt.verify(authorization, secret)
    } catch (err) {
        console.log(err);
    };

    if (payload) {
        return userID = payload.userID;
    }
    return false;
}

    

// Function whenever user wants to return category page 
let getCategories = (request, response) => {
    let authorizedUser = userAuthorization(request, response)
    if (authorizedUser) {
        processFileRequest(response, fcCategoryFileName);
    } else {
        response.end('REDIRECT BACK TO MAIN PAGE');
    }
};

let matchesTheRequest = (request, { method, path }) => {
    var sameMethod = request.method === method;
    if (sameMethod) {
        var samePath = path.exec(request.url);
        if (samePath) {
            return samePath.slice(1);
        }
    }
    return false;
};

let processFileRequest = (response, fileName) => {
    readDir('static', files => {
            return files;
        })
        .then(files => {
            if (files.indexOf(fileName) !== -1) {
                readFile(`static/${fileName}`)
                    .then(fileData => {
                        response.end(fileData);
                    })
            }
        })
        .catch(error => console.log(error))
};

let serveStaticFiles = (request, response) => {
    var requestFileName = request.url.slice(1);
    processFileRequest(response, requestFileName);
};

let notFound = (request, response) => {
    response.statusCode = 404;
    response.end('404, Nothing Here!');
};

let routes = [
    // { method: 'GET', path: '', handler: getData },
    // { method: 'DELETE', path: '', handler: deleteData },
    // { method: 'PUT', path: '', handler: updateData },
    // When the user wants to return to the flash card category page route to
    { method: 'GET', path: /^\/categories\/?$/, handler: getCategories },
    // When the Login Request Comes Here Route To
    { method: 'POST', path: /^\/tokens\/?$/, handler: processLogin }
];

let server = http.createServer(function(request, response) {
    let regex = /^(\/[a-z]+\.[a-z]+)$/;
    if (request.url === '/') {
        request.url = '/index.html';
    }
    if (regex.test(request.url)) {
        serveStaticFiles(request, response);
    } else {
        let params = [];
        let matchedRoute;
        for (let route of routes) {
            let matchedRequest = matchesTheRequest(request, route);
            if (matchedRequest) {
                matchedRoute = route;
                params = matchedRequest;
                break;
            }
        }
        matchedRoute ? matchedRoute.handler(request, response, params) : notFound(request, response);
    }
});

server.listen(3000);