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
    var jobDiv = document.querySelector('.job-listings');
    var table = document.createElement('table');
    var headerRow = table.insertRow(-1);
    var headerNameCell = document.createElement('TH');
    headerNameCell.textContent = 'Company';
    headerRow.appendChild(headerNameCell);

    var headerAddressCell = document.createElement('TH');
    headerAddressCell.textContent = 'Location';
    headerRow.appendChild(headerAddressCell);

    var headerRatingCell = document.createElement('TH');
    headerRatingCell.textContent = 'Job Title';
    headerRow.appendChild(headerRatingCell);

    var headerRatingCell = document.createElement('TH');
    headerRatingCell.textContent = 'Date Created';
    headerRow.appendChild(headerRatingCell);
    
    var headerRatingCell = document.createElement('TH');
    headerRatingCell.textContent = 'Description';
    headerRow.appendChild(headerRatingCell);

    jobList.forEach(function(job) {
        var logo = document.createElement('img');
        var row = table.insertRow();
        var companyCell = row.insertCell(0);
        companyCell.classList.add('company-cell');
        companyCell.textContent = job.company;
        logo.setAttribute('src', job.company_logo)
        companyCell.appendChild(logo);
        var addressCell = row.insertCell(1);
        addressCell.textContent = job.location;
        var titleCell = row.insertCell(2);
        titleCell.textContent = job.title;
        var dateCell = row.insertCell(3);
        dateCell.textContent = job.created_at;
        var descriptionCell = row.insertCell(4);
        descriptionCell.textContent = job.description;
    
        companyCell.addEventListener('click', function() {
            openInNewTab(job.url);
        });
    });
    jobDiv.appendChild(table);
};

