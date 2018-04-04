const http = require('http');
const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const db = require('./database');
const jwt = require('jsonwebtoken');
let WS = require('./websocket');
const secret = '1trw_87n$a%rthp';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fcCategoryFileName = 'fccategories.html'

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
        db.findUser('username', username)
            .then((user) => {
                bcrypt.compare(password, user[0].password)
                    .then(isValid => {
                        if (isValid) {
                            let token = createToken(user[0]);
                            console.log('Got a Token', token);
                            response.end(token);
                        } else {
                            console.log('Invalid password');
                            response.end('No token for you');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        response.end('Failed to Login');
                    })
            })
    });
};

let createToken = (user) => {
    let token = jwt.sign({ userID: user.id },
        secret, { expiresIn: '7d' }
    );
    return token
};

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
        console.log('User Authorization', payload.userID);
        return userID = payload.userID;
    }
    return false;
}

// Function to create account for the user - process new user account from JSON data retrieved and 
// store the credentials in the database
// signup request - http://localhost:3000/signup
// sample JSON request - { "username": "joe smith", "password": "password", "location": "Atlanta, GA", "email": "joe@joe.com" }
let createAccount = (request, response) => {
    getTextFromServer((request), (user) => {
        let userData = JSON.parse(user);
        bcrypt.hash(userData.password, saltRounds)
            .then(encryptedPwd => {
                db.insertUser(userData.username, encryptedPwd, userData.location, userData.email)
                    .then(() => response.end('New User Stored'))
                    .catch(error => {
                        console.log(error);
                        response.end('Failed to store User');
                    })
            })
            .catch(error => {
                console.log(error);
                response.end('Failed to generate Hash');
            })
    });
};

// Function whenever user wants to return category page 
let getCategories = (request, response) => {
    let authorizedUser = userAuthorization(request, response)
    if (authorizedUser) {
        processFileRequest(response, fcCategoryFileName);
    } else {
        response.end('REDIRECT BACK TO MAIN PAGE');
    }
};

let getFlashCards = (request, response, params) => {
    let authorizedUser = userAuthorization(request, response);
    if (authorizedUser) {
        db.getFlashCards(params[0].replace('%20', ' '))
            .then(data => {
                console.log(data);
                response.end(JSON.stringify(data))
            })
            .catch(error => console.log(error))
    }
};

let getUserData = (request, response) => {
    let authorizedUser = userAuthorization(request, response);
    if (authorizedUser) {
        db.getUserById(authorizedUser)
            .then(user => {
                let userInfo = { 'username': user[0].username, 'location': user[0].location, 'email': user[0].email };
                response.end(JSON.stringify(userInfo));
            })
            .catch(error => {
                console.log(error);
                response.end('Failed to Find User');
            })
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
    readFile(`static/${fileName}`)
        .then(fileData => {
            response.end(fileData);
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
    // When the user wants to return to the flash card category page Route to
    { method: 'GET', path: /^\/categories\/?$/, handler: getCategories },
    // When the request to get the flash cards with the Category Name then Route to
    { method: 'GET', path: /^\/fcquestions\/([a-zA-Z0-9% ]+)$/, handler: getFlashCards },
    // When the request to get the User Data then Route to
    { method: 'GET', path: /^\/userpage\/?$/, handler: getUserData },
    // When the Login Request Comes Here Route To
    { method: 'POST', path: /^\/tokens\/?$/, handler: processLogin },
    // When the Create New Account Request Comes Here Route To
    { method: 'POST', path: /^\/signup\/?$/, handler: createAccount }
];

let server = http.createServer(function(request, response) {
    let regex = /^(\/[a-zA-Z]+)?(\/[a-z]+\.[a-z]+)$/;
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