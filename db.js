const Pool = require("pg").Pool;
require("dotenv").config(); //using ENV variables in .env

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// const prodConfig = {
//     connectionString: process.env.DATABASE_URL, //heroku addon
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   };

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? client : devConfig,
});

module.exports = pool;