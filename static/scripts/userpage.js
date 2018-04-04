let triggerUserIcon = () => {
    let tokenValue = localStorage.getItem('authorization');
    fetch('/userpage', {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${tokenValue}`
            })
        })
        .then((results) => {
            return results.json();
        })
        .then((userInfo) => {
            console.log("User Info", userInfo);
            return appendUserInformationToPage(userInfo);
        })
};

let appendUserInformationToPage = (user) => {
    let contentDiv = document.querySelector('.content');
    let header = document.createElement('h1');
    header.textContent = user.username;
    contentDiv.appendChild(header);
    let email = document.createElement('h2');
    email.textContent = user.email;
    contentDiv.appendChild(email);
    let location = document.createElement('h2');
    location.textContent = user.location;
    contentDiv.appendChild(location);
    let changePassword = document.createElement('button');
    changePassword.textContent = 'Change Password'
    contentDiv.appendChild(changePassword);
    changePassword.addEventListener('click', (event) => {
        console.log(event.target);
    })
};

let eventListener = () => {
    let userIcon = document.querySelector('#user-id');
    userIcon.addEventListener('click', triggerUserIcon)
};

eventListener();