const { Pool } = require("pg"); 


// pg = PostgreSQL library , Pool = Connection manager

//Database sathe vaat karva no phone.

require("dotenv").config();

// aa file env mathi data vachse like DB_USER=postgre DB_PASSWORD= Sitaram

//NOw create pool

const pool = new Pool({
    
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    database : process.env.DB_DATABASE

});

//Hey PostgreSQL, hu aa user chu, aa password che, aa database ma entry joiye

// Add an event listener for connection errors on idle clients.
// Jo database connection ma kai problem aave (e.g., server bandh thai jaay), toh aa error log karse.
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;

//Aa pool ne bija file ma use karva allow kare.
//Example: const pool = require("../config/db");