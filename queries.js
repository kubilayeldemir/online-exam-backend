const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: 'postgres',
    password: process.env.PASSWORD,
    port: 5432,
    ssl: process.env.host==='localhost' ? false : true
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

const getUser = (req, res) => {
    let sql = `SELECT * FROM users WHERE user_id=${req.params.id}`
    pool.query(sql, (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const Login = (req, res) => {
    var query = `
    select *
    from users
    where mail = '${req.body.mail}'
    AND password = '${req.body.password}';
    `
    console.log(query)
    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        if (results.rowCount === 1 && req.body.password===results.rows[0].password ) {
            res.status(200).json({
                    "User": results.rows[0]
                ,                
                    "AuthKey":123123123
                }
                )
        }
    })
}

const getExams = (request, response) => {
    pool.query('SELECT * FROM exam', (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getExam = (req, res) => {
    let sql = `SELECT * FROM exam where exam_id=${req.params.examId}`
    console.log(sql);
    pool.query(sql, (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createExam = (req, res) => {
    pool.query(`
    INSERT INTO exam(teacher_id, name, lesson, startdate, enddate,url)
    VALUES (${req.body.teacher_id}, '${req.body.name}', '${req.body.lesson}', '${req.body.startdate}', '${req.body.enddate}','${req.body.url}') 
    RETURNING*;`, (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}
const addQuestion = (req, res) => {
    pool.query(`INSERT INTO question(exam_id, teacher_id, question_text, correct_option, option_1, option_2, option_3, option_4, option_5)
    VALUES('${req.body.exam_id}', '${req.body.teacher_id}', '${req.body.question_text}', '${req.body.correct_option}', '${req.body.option_1}',
     '${req.body.option_2}', '${req.body.option_3}', '${req.body.option_4}', '${req.body.option_5}') RETURNING*;
    `, (error, results) => {
        if (error) {
            console.log(error);
            res.status(400).json(error)
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const addQuestions = (req, res) => {    
    let sql = ''
    sql += 'INSERT INTO question(exam_id, teacher_id, question_text, correct_option, option_1, option_2, option_3, option_4, option_5)';
    sql += ' VALUES '
    let idx=0;
    req.body.forEach(((question) => {
        sql += `('${req.params.examId}', '${question.teacher_id}', '${question.question_text}', '${question.correct_option}', '${question.option_1}',
        '${question.option_2}', '${question.option_3}', '${question.option_4}', '${question.option_5}'),`
        
            }));
    sql=sql.substring(0, sql.length - 1);
    sql+= ' RETURNING*'
    
    console.log(sql);
    pool.query(sql, (error, results) => {
        if (error) {
            console.log(error);
            res.status(400).json(error)
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}



module.exports = {
    getUsers,
    getUser,
    Login,
    getExams,
    createExam,
    addQuestion,
    addQuestions,
    getExam
    
}
