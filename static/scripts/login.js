const pg = require('pg-promise')();

const dbconfig = 'postgres://Ashley@localhost/phonebook';
const db = pg(dbconfig);

let createNewUser = () => {
    db.query(`INSERT INTO users (username, password, location, email) VALUES ('${form.username.value}', '${form.password.value}', '${form.location.value}', '${form.email.value}');`);
}