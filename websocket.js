let WebSocket = require('ws')
let WebSocketServer = WebSocket.Server;
let port = 3001;
let ws = new WebSocketServer({
	port: port
});

users=[];

ws.on('connection', (client, req) => {
    let userName;
	client.on('message', (data) => {
        if (userName === undefined) {
            userName = data;
            users.push(userName);
            ws.clients.forEach( (client) => {
                client.send(`users:${users}`)
            });
        } else {
        ws.clients.forEach( (client) => {
                client.send(`${userName}: ${data}`);
        });
	    };
})
});
