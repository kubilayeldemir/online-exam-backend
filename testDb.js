const {
    Pool
} = require('pg')

const pool = new Pool({
    user: 'nope',
    host: 'nope',
    database: 'nope',
    password: 'nope',
    port: 5432,
    ssl: false
})

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})
