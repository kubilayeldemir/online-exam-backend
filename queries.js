const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: 'postgres',
    password: process.env.PASSWORD,
    port: 5432,
    ssl: true
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
    getUsers
    
}