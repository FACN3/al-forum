const env = require('env2');
env('./config.env');
const {Pool} = require('pg');

let DB_URL = process.env.DB_URL;

if(!DB_URL) {
  throw new Error("environment variable DB_URL must be set");
}

const pool = new Pool({
  connectionString: process.env.DB_URL
});

module.exports = pool;
