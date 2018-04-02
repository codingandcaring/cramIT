let ws = new WebSocket('ws://localhost:3001') 

let form = document.querySelector('body > div.chatbox > div > section > form');

let button = document.querySelector('body > div.start-chat > form')
let username;
let participants = [];

button.addEventListener('submit', (event) => {
    event.preventDefault();
    username = button.username.value;
    let chatbox = document.querySelector('.chatbox');
    let frontpage = document.querySelector('.start-chat');
    let ul = document.querySelector('.user-list')
    chatbox.classList.add('active');
    frontpage.classList.add('active'); 
    ws.send(username);
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let message = form.message.value;
    ws.send(message);
    form.reset();
})

ws.addEventListener('message', function(event) {
    let usernameRegex = /^users:/
    let ul = document.querySelector('body > div.chatbox.active > nav > ul')
    let userList = [];
    if (usernameRegex.exec(event.data)) {
        let users = (event.data).toString();
        userList.push(users);
        userList.forEach( (participant) => {
            participant = participant.replace('users:', '');
            while (ul.firstChild) ul.removeChild(ul.firstChild);
            let li = createLiElement(participant);
            appendLiToUl(li, ul);
        });
    } else {
    let li = createLiElement(event.data);
    let ul = document.querySelector('body > div.chatbox > div > div > ul');
    appendLiToUl(li, ul);
    }
});

let createLiElement = (message) => {
    let liElement = document.createElement('li');
    liElement.textContent = message;
    return liElement;
}

let appendLiToUl = (li, ul) => {
    ul.appendChild(li);
}