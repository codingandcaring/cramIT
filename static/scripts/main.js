
let triggerLoginWindow = (event) => {
    let loginWindow = document.querySelector('.pop-up-login');
    loginWindow.classList.add('active');
    let closeButton = document.querySelector('body > div > div.pop-up-login.active > form > span')
    closeButton.addEventListener('click', closeWindow);
    let form = document.querySelector('body > div > div.pop-up-login.active > form')
    form.addEventListener('submit', userLogin);
}

let triggerCreateAccountWindow = (event) => {
    let loginWindow = document.querySelector('.pop-up-create-account');
    loginWindow.classList.add('active');
    let closeButton = document.querySelector('body > div > div.pop-up-create-account.active > form > span')
    closeButton.addEventListener('click', closeWindow);
    let form = document.querySelector('body > div > div.pop-up-create-account.active > form')
    form.addEventListener('submit', createNewAccount);
}

let userLogin = () => {
    let form = document.querySelector('body > div > div.pop-up-login.active > form')
    let username = form.username.value;
    let password = form.password.value;
    console.log(username + " : " + password);
};

let createNewAccount = (event) => {
    event.preventDefault()
    console.log(event);
}

let closeWindow = (event) => {
    let window = event.target.parentElement.parentElement;
    window.classList.remove('active');
}

let addEventListeners = () => {
    let loginButton = document.querySelector('body > div > div.log-in > button:nth-child(1)');
    let createAccountButton = document.querySelector('body > div > div.log-in > button:nth-child(2)');
    loginButton.addEventListener('click', triggerLoginWindow);
    createAccountButton.addEventListener('click', triggerCreateAccountWindow);
}



addEventListeners();



