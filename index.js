const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
var CryptoJS = require("crypto-js");
const db = require('./queries')

var cors = require('cors');

app.use(cors());

async function basicAuthentication(req, res, next) {
    if (req.path == '/api/login') return next();

    if (req.get("Auth") === undefined) {
        res.status(401).json("No Auth Data");
        return;
    }
    enc = CryptoJS.AES.decrypt(req.get("Auth"), "sifrecisifrecii")
    try {
        var liste = enc.toString(CryptoJS.enc.Utf8).split(":")
    } catch (error) {
        res.status(401).json("Wrong Auth Data");
        return;
    }
    db.checkAuth(liste[0], liste[1]).then(isAuth => {
        if (isAuth) {
            next();
        } else {
            res.status(401).json("You are not authorized");
        }
    })
    res.status(500);
}

app.use(basicAuthentication);

app.get('/', (req, res) => {
    var api = process.env.DATABASE_URL
    res.send(api);
})

app.post('/api/login', db.Login)

//app.get('/api/users', db.getUsers)

//app.get('/api/users/:id', db.getUser)

app.get('/api/exams', db.getExams)

app.get('/api/exams/:examId', db.getExam)

app.post('/api/exams', db.createExam)

app.post('/api/exams/:examId/questions', db.addQuestions)

app.get('/api/exams/:examId/questions', db.getQuestions)

app.post('/api/exams/:examId/answers', db.addAnswer)

app.get('/api/exams/url/:url', db.getExamURL)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));