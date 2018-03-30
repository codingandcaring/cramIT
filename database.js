const pg = require('pg-promise')();

const builder = process.env.USER
const dbconfig = `postgres://${builder}@localhost/cramit`;
const db = pg(dbconfig);


let findUser = (attribute, input) => {
    return db.query(`SELECT * FROM users WHERE ${attribute} = '${input}';`)
}

let insertUser = (username, password, location, email) => {
    return db.query(`INSERT INTO users (username, password, location, email) 
                    VALUES ('${username}', '${password}', '${location}', '${email}'); `)
}

module.exports = {
    findUser,
    insertUser
}