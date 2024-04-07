// db.js

// write `const db=require('../db-connection.js') in every route file

const pgp = require('pg-promise')();

const cn = {
    // host: 'db', // the service name from docker-compose.yml
    // // host: 'http://localhost-lb-420614602.ca-central-1.elb.amazonaws.com',
    // port: 5432,
    // database: 'postgres', 
    // user: 'postgres',
    // password: 'postgres'

    host: 'aws-0-ca-central-1.pooler.supabase.com',
	port: 5432,
    database: 'postgres', 
    user: 'postgres.tmeseckyonsoxkmspewp',
    password: 'postgres@499'
};

const db = pgp(cn);

module.exports = db;


