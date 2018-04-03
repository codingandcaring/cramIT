const pg = require('pg-promise')();

const builder = process.env.USER
const dbconfig = `postgres://${builder}@localhost/cramit`;
const db = pg(dbconfig);


let findUser = (attribute, input) => {
    return db.query(`SELECT * FROM users WHERE ${attribute} = '${input}';`)
};

let insertUser = (username, password, location, email) => {
    return db.query(`INSERT INTO users (username, password, location, email) 
                    VALUES ('${username}', '${password}', '${location}', '${email}'); `)
};

let insertQuestion = (category_name, question, answer, difficulty) => {
    return db.query(`INSERT INTO cards (category_name, question, answer, difficulty)
                     VALUES ('${category_name}', '${question}', '${answer}', '${difficulty}');`)
};

let listQuestionCategories = () => {
    return db.query(`SELECT DISTINCT ON (category_name) category_name from cards`);
};

let getFlashCards = (category_name) => {
    return db.query(`SELECT * From cards WHERE category_name = '${category_name}';`)
};

let getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max)); // maybe need plus 1
}

let totalCards = () => {
    return db.query(`SELECT COUNT(*) FROM cards;`);
}

let getOneCardById = (id) => {
    return db.query(`SELECT * FROM cards WHERE id ='${id}';`);
};

let getRandomCards = (total) => {
    return db.query(`SELECT * FROM cards ORDER BY random() LIMIT 10;`);
};

module.exports = {
    findUser,
    insertUser,
    getFlashCards,
    getRandomCards,
    totalCards,
    insertQuestion,
    listQuestionCategories
}

