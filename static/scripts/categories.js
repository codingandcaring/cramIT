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
    openLightbox();
    let tokenValue = localStorage.getItem('authorization');
    fetch(`/fcquestions/${category_name}`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${tokenValue}`
        })
    })
    .then((results) => {
        return results.json();
    })
    .then( (questions) => {
        localStorage.setItem('questions', questions)
        appendQuestionToFlashCard(questions);
    })
}

let appendQuestionToFlashCard = (questions) => {
    clearFlashcard();
    let item = questions[0];
    let questionDiv = document.querySelector('.question');
    let answerDiv = document.querySelector('.answer');
    let header = document.createElement('h1');
    header.textContent = item.category_name;
    questionDiv.appendChild(header);
    let question = document.createElement('h2');
    question.textContent = item.question;
    questionDiv.appendChild(question);
    let showAnswer = document.querySelector('#flashcard-lightbox > div > div.answer-buttons > button.flashcard-submit')
    showAnswer.addEventListener('click', (event) => {
        while (answerDiv.firstChild) answerDiv.removeChild(answerDiv.firstChild);
        let answer = document.createElement('h3');
        answer.textContent = item.answer;
        answerDiv.appendChild(answer);
    })
}

let clearFlashcard = () => {
    let questionDiv = document.querySelector('.question');
    let answerDiv = document.querySelector('.answer');
    while (questionDiv.firstChild) questionDiv.removeChild(questionDiv.firstChild);
    while (answerDiv.firstChild) answerDiv.removeChild(answerDiv.firstChild);
}

let openLightbox = () => {
    let lightbox = document.querySelector('#flashcard-lightbox');
    let categories = document.querySelector('#categories');
    lightbox.classList.add('active');
    categories.classList.add('active')
    let closeButton = document.querySelector('#flashcard-lightbox > div > span')
    closeButton.addEventListener('click', closeWindow);
    let nextButton =document.querySelector('#flashcard-lightbox > div > div.answer-buttons > button:nth-child(3)')
    let previousButton = document.querySelector('#flashcard-lightbox > div > div.answer-buttons > button:nth-child(1)')
    nextButton.addEventListener('click', nextQuestion);
    previousButton.addEventListener('click', previousQuestion)
}

let closeWindow = (event) => {
    let lightbox = document.querySelector('#flashcard-lightbox');
    let categories = document.querySelector('#categories');
    lightbox.classList.remove('active');
    categories.classList.remove('active')
};

let nextQuestion = (event) => {
    console.log(event);
}

let previousQuestion = (event) => {
    console.log(event);
}

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