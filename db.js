const pg = require('pg-promise')();
const dbConfig = 'postgres://pmattam@localhost:5432/cramit';
const db = pg(dbConfig);

module.exports = db;