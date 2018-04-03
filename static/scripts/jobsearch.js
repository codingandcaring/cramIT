// Populate Search Results

let url = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json`;

fetch(url, {
    method:'GET',
})
.then((response) => {
    return response.json();
})
.then( (data) => {
    return processGetData(data);
})
.then((data) => {
    return addJobListToPage(data);
});


var processGetData = (apiData) => {
    rawData = Object.values(apiData);
    return rawData;
};


var addJobListToPage = (jobList) => {
    console.log(jobList);
    var searchDiv = document.querySelector('.job-listings');
    
    jobList.forEach(function(job) {
        var ulElement = document.createElement('ul');
        var company = document.createElement('h3')
        company.textContent = job.company;
        var companyLi = createLiElement(company);
        ulElement.appendChild(companyLi);
        var logo = document.createElement('img');
        logo.setAttribute('src', job.company_logo);
        var logoLi = createLiElement(logo);
        ulElement.appendChild(logoLi);
        var title = document.createElement('h4')
        title.textContent = job.title;
        var titleLi =createLiElement(title);
        ulElement.appendChild(titleLi);
        var location = document.createElement('h4')
        location.textContent = job.location;
        var locationLi =createLiElement(location);
        ulElement.appendChild(locationLi);
        var date = document.createElement('h5');
        date.textContent = `Created on: ${job.created_at}`;
        dateLi = createLiElement(date)
        ulElement.appendChild(dateLi);
        var description = document.createElement('h5')
        description.textContent = job.description;
        descriptionLi = createLiElement(description);
        ulElement.appendChild(descriptionLi);
        ulElement.addEventListener('click', function(e) {
            e.preventDefault();
            openInNewTab(job.url);
        })
        searchDiv.appendChild(ulElement);
    });

}

var createLiElement = function(text) {
    var liElement = document.createElement('li');
    liElement.appendChild(text);
    return liElement;
}
