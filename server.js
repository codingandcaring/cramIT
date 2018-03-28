const http = require('http');
const fs = require('fs');
const readDir = require('fs-readdir-promise');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const express = require('express');
const app = express();

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

let serveStaticFiles = (request, response) => {
    var requestFileName = request.url.slice(1);
    readDir('static', files => {
            return files;
        })
        .then(files => {
            if (files.indexOf(requestFileName) !== -1) {
                readFile(`static/${requestFileName}`)
                    .then(fileData => {
                        response.end(fileData);
                    })
            }
        })
        .catch(error => console.log(error))
};

let notFound = (request, response) => {
    response.statusCode = 404;
    response.end('404, Nothing Here!');
};

let routes = [{
        method: 'GET',
        path: '',
        handler: getData
    },
    {
        method: 'DELETE',
        path: '',
        handler: deleteData
    },
    {
        method: 'PUT',
        path: '',
        handler: updateData
    },
    {
        method: 'GET',
        path: '',
        handler: allData
    },
    {
        method: 'POST',
        path: '',
        handler: postData
    }
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