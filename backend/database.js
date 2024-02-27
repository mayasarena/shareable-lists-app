const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    post: process.env.DBPORT,
    database: 'tasks'
})

module.exports = pool;