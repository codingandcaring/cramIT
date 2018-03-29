const pg = require('pg-promise')();

const builder = process.env.USER
const dbconfig = `postgres://${builder}@localhost/cramit`;
const db = pg(dbconfig);


let findUser = (attribute, input) => {
    return db.query(`SELECT * FROM users WHERE ${attribute} = '${input}';`)
}

module.exports = findUser;