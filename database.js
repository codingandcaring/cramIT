const pg = require('pg-promise')();

const builder = process.env.USER
const dbconfig = `postgres://${builder}@localhost/cramit`;
const db = pg(dbconfig);


let findUser = (attribute, input) => {
    return new Promise ( (resolve, reject) => {
        db.query(`SELECT * FROM users WHERE ${attribute} = '${input}';`)
        .then( (user) => {
            (pg.end);
            resolve(user);
            reject('No user found');
        })
    })
}

module.exports = findUser;