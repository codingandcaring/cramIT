let triggerHtmlCssCategory = () => {
    processFlashCardCategory('HTMLCSS');
};

let triggerJsCategory = () => {
    processFlashCardCategory('JavaScript');
};

let triggerNodeCategory = () => {
    processFlashCardCategory('NodeJS');
};

let triggerPythonCategory = () => {
    processFlashCardCategory('Python');
};

let triggerDatabaseCategory = () => {
    processFlashCardCategory('Database');
};

let triggerAlgorithmsDataStructuresCategory = () => {
    processFlashCardCategory('Algorithms DataStructures');
};

let triggerGitCategory = () => {
    processFlashCardCategory('Git');
};

let triggerRandomCategory = () => {
    processFlashCardCategory('Random');
};

let triggerRestCategory = () => {
    processFlashCardCategory('REST');
};

let triggerNonTechnicalCategory = () => {
    processFlashCardCategory('NonTechnical');
};

let processFlashCardCategory = (category_name) => {
    // Read tokenValue from the local storage
    let lightbox = document.querySelector('#flashcard-lightbox');
    let categories = document.querySelector('#categories');
    lightbox.classList.add('active');
    categories.classList.add('active')

    let tokenValue = localStorage.getItem('authorization');
    fetch(`/fcquestions/${category_name}`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${tokenValue}`
        })
    }).then(response => {
        const reader = response.body.getReader();
        reader.read()
            .then(({ done, value }) => {
                let data = new TextDecoder("utf-8").decode(value);
                console.log(data);
            })
    })
};

let eventListeners = () => {
    let htmlCssCt = document.querySelector('.category-1');
    let jsCt = document.querySelector('.category-2');
    let nodeCt = document.querySelector('.category-3');
    let pythonCt = document.querySelector('.category-4');
    let databaseCt = document.querySelector('.category-5');
    let algorithmsDsCt = document.querySelector('.category-6');
    let gitCt = document.querySelector('.category-7');
    let randomCt = document.querySelector('.category-8');
    let restCt = document.querySelector('.category-9');
    let nonTechnicalCt = document.querySelector('.category-10');
    htmlCssCt.addEventListener('click', triggerHtmlCssCategory);
    jsCt.addEventListener('click', triggerJsCategory);
    nodeCt.addEventListener('click', triggerNodeCategory);
    pythonCt.addEventListener('click', triggerPythonCategory);
    databaseCt.addEventListener('click', triggerDatabaseCategory);
    algorithmsDsCt.addEventListener('click', triggerAlgorithmsDataStructuresCategory);
    gitCt.addEventListener('click', triggerGitCategory);
    randomCt.addEventListener('click', triggerRandomCategory);
    restCt.addEventListener('click', triggerRestCategory);
    nonTechnicalCt.addEventListener('click', triggerNonTechnicalCategory);
};

eventListeners();