const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
const db = require('./queries')


app.get('/', (req, res) => {    
    var api = process.env.DATABASE_URL
    res.send(api);
    console.log(api)
})

app.post('/api/login', db.Login)

app.get('/api/users', db.getUsers)

app.get('/api/users/:id', db.getUser)

app.get('/api/exams', db.getExams)

app.get('/api/exams/:examId', db.getExam)

app.post('/api/exams', db.createExam)

//app.post('/api/exams/:id/questions', db.addQuestion)

app.post('/api/exams/:examId/questions', db.addQuestions)

//app.post('/api/addquestions', db.addQuestions)

//app.get('/api/addquestions', db.addQuestions)


//--------------------------------------------
/*
app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){
        res.status(404).send('Course bulunamadı');
    }
    res.send(course);
})

app.post('/api/courses',(req,res)=>{
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body,schema);
    console.log(result);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id:courses.length + 1,
        name:req.body.name,
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send('Course bulunamadı');
    }
    const { error } = validaCourse(req.body);//result.error
    
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name=req.body.name;
    res.send(course);

});

app.delete("/api/courses/:id",(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
})

function validaCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return  Joi.validate(course, schema);
}*/

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));