let ws = new WebSocket('ws://localhost:3001') 

let form = document.querySelector('body > div.chatbox > div > section > form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let message = form.message.value;
    ws.send(message);
    form.reset();
})

ws.addEventListener('message', function(event) {
    let li = createMessageLiElement(event.data);
    appendLiToUl(li);

});

let createMessageLiElement = (message) => {
    let liElement = document.createElement('li');
    liElement.textContent = message;
    return liElement;
}

let appendLiToUl = (li) => {
    let ul = document.querySelector('body > div.chatbox > div > div > ul');
    ul.appendChild(li);
}