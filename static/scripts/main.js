let triggerLoginWindow = (event) => {
    event.preventDefault();
    let loginWindow = document.querySelector('.pop-up-login');
    loginWindow.classList.add('active');
    let closeButton = document.querySelector('body > div > div.pop-up-login.active > form > span')
    closeButton.addEventListener('click', closeWindow);
    let form = document.querySelector('body > div > div.pop-up-login.active > form')
    form.addEventListener('submit', userLogin);
};

let triggerCreateAccountWindow = (event) => {
    event.preventDefault();
    let loginWindow = document.querySelector('.pop-up-create-account');
    loginWindow.classList.add('active');
    let closeButton = document.querySelector('body > div > div.pop-up-create-account.active > form > span')
    closeButton.addEventListener('click', closeWindow);
    let form = document.querySelector('body > div > div.pop-up-create-account.active > form')
    form.addEventListener('submit', createNewAccount);
};

let mapFromLoginForm = (username, password) => {
    let userData = {
        "username": username,
        "password": password
    }
    return userData;
};

let userLogin = (event) => {
    // Have to prevent the event default else it will default the request to 'GET' method
    event.preventDefault();
    let form = document.querySelector('body > div > div.pop-up-login.active > form')
    let userData = mapFromLoginForm(form.username.value, form.password.value);
    form.reset();
    fetch('/tokens', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(response => {
        if (response.status === 200) {
            const reader = response.body.getReader();
            reader.read()
                .then(({ done, value }) => {
                    let tokenValue = new TextDecoder("utf-8").decode(value)
                    console.log("value", tokenValue);
                })
                .then(() => document.location.href = '/fccategories.html')
        } else {
            console.log("Can't log you in");
        }
    })
};

let createNewAccount = (event) => {
    event.preventDefault();
    let form = document.querySelector('body > div > div.pop-up-create-account.active > form')
    form.reset();
    console.log(event);
};

let closeWindow = (event) => {
    let window = event.target.parentElement.parentElement;
    window.classList.remove('active');
};

let addEventListeners = () => {
    let loginButton = document.querySelector('body > div > div.log-in > button:nth-child(1)');
    let createAccountButton = document.querySelector('body > div > div.log-in > button:nth-child(2)');
    loginButton.addEventListener('click', triggerLoginWindow);
    createAccountButton.addEventListener('click', triggerCreateAccountWindow);
};

addEventListeners();