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
    let form = document.querySelector('body > div > div.pop-up-login.active > form');
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
                    let tokenValue = new TextDecoder("utf-8").decode(value);
                    console.log("token value", tokenValue);
                    localStorage.setItem('authorization', tokenValue);
                    return tokenValue;
                })
                .then(tokenValue => {
                    /*fetch('/categories', {
                        method: 'GET',
                        headers: new Headers({
                            'Authorization': `Bearer ${tokenValue}`
                        })
                    }).then(response => {
                        const reader = response.body.getReader();
                        reader.read()
                            .then(({ done, value }) => {
                                let data = new TextDecoder("utf-8").decode(value);
                                document.write(data);
                            })
                    }) */
                    window.location.replace('http://localhost:3000/categories');
                    //localStorage.setItem('authorization', tokenValue);
                });
        } else {
            console.log("Can't log you in");
        }
    })
};

let mapFromCreateAccountForm = (username, password, email, location) => {
    let userData = {
        "username": username,
        "password": password,
        "email": email,
        "location": location
    }
    return userData;
};

// After successfully creating account for new user redirecting 
// the user to login page to login
let createNewAccount = (event) => {
    event.preventDefault();
    let form = document.querySelector('body > div > div.pop-up-create-account.active > form');
    let userData = mapFromCreateAccountForm(form.username.value, form.password.value, form.email.value, form.location.value);
    console.log(userData);
    form.reset();
    fetch('/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(response => {
        if (response.status === 200) {
            document.location.href = '/index.html';
        } else {
            console.log("Can't create account");
        }
    })
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
