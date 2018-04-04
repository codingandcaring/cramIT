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
        .then((questions) => {
            localStorage.setItem('questions', JSON.stringify(questions));
            appendQuestionToFlashCard(questions[0]);
        })
}

let appendQuestionToFlashCard = (item) => {
    clearFlashcard();
    let questionDiv = document.querySelector('.question');
    let answerDiv = document.querySelector('.answer');
    let header = document.createElement('h1');
    header.textContent = item.category_name;
    questionDiv.appendChild(header);
    let question = document.createElement('h2');
    question.textContent = item.question;
    questionDiv.appendChild(question);
    let ID = document.createElement('h5');
    ID.textContent = item.id;
    let idDiv = document.querySelector('.question-id');
    idDiv.appendChild(ID);
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
    let idDiv = document.querySelector('.question-id');
    while (questionDiv.firstChild) questionDiv.removeChild(questionDiv.firstChild);
    while (answerDiv.firstChild) answerDiv.removeChild(answerDiv.firstChild);
    while (idDiv.firstChild) idDiv.removeChild(idDiv.firstChild);
}

let openLightbox = () => {
    let lightbox = document.querySelector('#flashcard-lightbox');
    let categories = document.querySelector('#categories');
    lightbox.classList.add('active');
    categories.classList.add('active')
    let closeButton = document.querySelector('#flashcard-lightbox > div > span')
    closeButton.addEventListener('click', closeFcWindow);
    let nextButton = document.querySelector('#flashcard-lightbox > div > div.answer-buttons > button:nth-child(3)')
    let previousButton = document.querySelector('#flashcard-lightbox > div > div.answer-buttons > button:nth-child(1)')
    nextButton.addEventListener('click', nextQuestion);
    previousButton.addEventListener('click', previousQuestion)
}

let closeFcWindow = (event) => {
    let lightbox = document.querySelector('#flashcard-lightbox');
    let categories = document.querySelector('#categories');
    lightbox.classList.remove('active');
    categories.classList.remove('active')
};

let nextQuestion = (event) => {
    let currentQuestionID = document.querySelector('#flashcard-lightbox > div > span.question-id > h5');
    currentQuestionID = parseInt(currentQuestionID.textContent, 10)
    let questionList = JSON.parse(localStorage.getItem('questions'));
    questionList.forEach((question) => {
        if (question.id === (currentQuestionID + 1)) {
            appendQuestionToFlashCard(question);
        }
    })
}

let previousQuestion = (event) => {
    let currentQuestionID = document.querySelector('#flashcard-lightbox > div > span.question-id > h5');
    currentQuestionID = parseInt(currentQuestionID.textContent, 10)
    let questionList = JSON.parse(localStorage.getItem('questions'));
    questionList.forEach((question) => {
        if (question.id === (currentQuestionID - 1)) {
            appendQuestionToFlashCard(question);
        }
    })
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