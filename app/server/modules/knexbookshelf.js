
/////////////
// THEDOMN //// CONEXIUNEA MYSQL AICI O FACI!
/////////////



exports = knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.7', // HOSTNAME
    user     : 'root', // USER-UL
    password : '', // PAROLA
    database : 'mta', // NUMELE BAZEI DE DATE 
    charset  : 'utf8' 
  }
});

exports = bookshelf = require('bookshelf')(knex);