

fetch('http://localhost:3000/userpage', {method:'GET'})
.then((results) => {
    return results.json();
})
.then( (userInfo) => {
    return appendUserInformationToPage(userInfo);
})

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
}

