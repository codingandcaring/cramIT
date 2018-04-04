let triggerUserIcon = () => {
    let userBox = document.querySelector('.user-box');
    userBox.classList.toggle('active');
    let profile = document.querySelector('.profile');
    profile.addEventListener('click', getUserProfile)
    let logout = document.querySelector('.logout');
    logout.addEventListener('click', userLogout);
};

let getUserProfile = () => {
    let userBox = document.querySelector('.user-box');
    userBox.classList.remove('active');
    openLightBox();
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
            return appendUserInformationToPage(userInfo);
        })
};

let userLogout = () => {
    localStorage.removeItem('authorization');
    window.location.replace('/index.html');
};

let appendUserInformationToPage = (user) => {
    console.log("User", user);
    clearUserData();
    let nameDiv = document.querySelector('.name');
    let locationDiv = document.querySelector('.location');
    let emailDiv = document.querySelector('.email');
    let nameHeading = document.createElement('h1');
    nameHeading.textContent = user.username;
    nameDiv.appendChild(nameHeading);
    let locationHeading = document.createElement('h2');
    locationHeading.textContent = user.location;
    locationDiv.appendChild(location);
    let emailHeading = document.createElement('h2');
    emailHeading.textContent = user.email;
    emailDiv.appendChild(emailHeading);
};

let clearUserData = () => {
    let nameDiv = document.querySelector('.name');
    let locationDiv = document.querySelector('.location');
    let emailDiv = document.querySelector('.email');
    while (nameDiv.firstChild) nameDiv.removeChild(nameDiv.firstChild);
    while (locationDiv.firstChild) locationDiv.removeChild(locationDiv.firstChild);
    while (emailDiv.firstChild) emailDiv.removeChild(emailDiv.firstChild);
}

let openLightBox = () => {
    let lightbox = document.querySelector('#userprofile-lightbox');
    let categories = document.querySelector('#categories');
    lightbox.classList.add('active');
    categories.classList.add('active')
    let closeButton = document.querySelector('#userprofile-lightbox > div > span')
    closeButton.addEventListener('click', closeProfileWindow);
};

let closeProfileWindow = (event) => {
    let lightbox = document.querySelector('#userprofile-lightbox');
    let categories = document.querySelector('#categories');
    lightbox.classList.remove('active');
    categories.classList.remove('active')
};

let eventListener = () => {
    let userIcon = document.querySelector('#user-id');
    userIcon.addEventListener('click', triggerUserIcon)
};

eventListener();