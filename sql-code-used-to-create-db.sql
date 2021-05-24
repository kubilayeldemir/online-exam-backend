CREATE TABLE users(
	user_id serial PRIMARY KEY,
	userType INT,
	mail VARCHAR ( 150 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	name VARCHAR ( 255 ) ,
	surname VARCHAR ( 255 ),
	tc BIGINT
);

CREATE TABLE exam(
	exam_id serial PRIMARY KEY,
	teacher_id INT,
	name VARCHAR ( 150 ),
	lesson VARCHAR ( 50 ) NOT NULL,
	startDate TIMESTAMP,
	endDate TIMESTAMP,
	CONSTRAINT fk_teacher
      FOREIGN KEY(teacher_id)
	  REFERENCES users(user_id)

);
DROP TABLE question CASCADE ;

CREATE TABLE question(
	question_id serial PRIMARY KEY,
	exam_id INT,
	teacher_id INT,
	question_text VARCHAR ( 150 ),
	correct_option CHAR ,
	option_1 VARCHAR ( 150 ),
	option_2 VARCHAR ( 150 ),
	option_3 VARCHAR ( 150 ),
	option_4 VARCHAR ( 150 ),
	option_5 VARCHAR ( 150 ),
	CONSTRAINT fk_teacher
      FOREIGN KEY(teacher_id)
	  REFERENCES users(user_id),
	CONSTRAINT fk_exam
      FOREIGN KEY(exam_id)
	  REFERENCES exam(exam_id)

);
CREATE TABLE exam_entry(
	exam_entry_id serial PRIMARY KEY,
	exam_id INT,
	user_id INT,
	entryDate TIMESTAMP,
	CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES users(user_id),
	CONSTRAINT fk_exam
      FOREIGN KEY(exam_id)
	  REFERENCES exam(exam_id)

);
CREATE TABLE answer(
	answer_id serial PRIMARY KEY,
	question_id INT,
	student_id INT,
	exam_id INT,
	CONSTRAINT fk_student
      FOREIGN KEY(student_id)
	  REFERENCES users(user_id),
	CONSTRAINT fk_question
      FOREIGN KEY(question_id)
	  REFERENCES question(question_id),
	CONSTRAINT fk_exam
      FOREIGN KEY(exam_id)
	  REFERENCES exam(exam_id)

);

INSERT INTO public.users(
	usertype, mail, password, name, surname, tc)
	VALUES ( 0, 'kubilayeldemir@hotmail.com', 'admin5432', 'Kubilay', 'Eldemir', 34927791194);

INSERT INTO public.users(
	usertype, mail, password, name, surname, tc)
	VALUES ( 1, '1kubilayeldemir@hotmail.com', 'admin5432', 'Kubilay', 'Eldemir', 34927791194);

INSERT INTO public.users(
	usertype, mail, password, name, surname, tc)
	VALUES ( 2, '2kubilayeldemir@hotmail.com', 'admin5432', 'Kubilay', 'Eldemir', 34927791194);

INSERT INTO public.users(
	usertype, mail, password, name, surname, tc)
	VALUES ( 2, '05160000222@ogrenci.ege.edu.tr', 'admin5432', 'Kubilay', 'Eldemir', 34927791194);

INSERT INTO public.users(
	usertype, mail, password, name, surname, tc)
	VALUES ( 1, 'ogretmen_kubilayeldemir@ege.edu.tr', 'admin5432', 'Kubilay', 'Eldemir', 34927791194);

INSERT INTO public.exam(
	 teacher_id, name, lesson, startdate, enddate)
	VALUES (4, 'Bulut Bilişim Final', 'Bulut Bilişim', current_timestamp, '02-01-2006 15:04:05');

INSERT INTO public.exam(
	 teacher_id, name, lesson, startdate, enddate)
	VALUES (2, 'Bulut Bilişim Final', 'Bulut Bilişim', current_timestamp, '02-02-2021 15:04:05');

INSERT INTO public.users(
	usertype, mail, password, name, surname, tc)
	VALUES ( 0, 'selami@hotmail.com', 'admin5432', 'Selami', 'Kelaynak', 12312312);

INSERT INTO public.users(
	usertype, mail, password, name, surname, tc)
	VALUES ( 0, 'Agah@hotmail.com', 'admin5432', 'Agah', 'Bey', 12121212);


INSERT INTO public.question(
	 exam_id, teacher_id, question_text, option_1, option_2, option_3, option_4, option_5)
	VALUES ( 2, 2, 'Hangisi doğrudur?', 'bu mu', 'o mu?', 'şu mu?', 'bu mu', 'yoksaa');

INSERT INTO public.question(
	 exam_id, teacher_id, question_text, correct_option, option_1, option_2, option_3, option_4, option_5)
	VALUES ( 2, 4, 'Hangisi doğrudur', 'A', 'bu mu', 'o mu?', 'şu mu?', 'bu mu', 'yoksaa');

INSERT INTO public.answer(
	 question_id, student_id, exam_id )
	VALUES ( 1, 2, 2);
select * from users;


select *
from answer,exam
join answer a on exam.exam_id = a.exam_id;

select * from users;

ALTER TABLE exam ADD URL varchar(20) UNIQUE;

CREATE TABLE error(
	error_id serial PRIMARY KEY,
	message TEXT,
	stack TEXT,
	date TIMESTAMP
);

ALTER TABLE answer ADD selected_option CHAR;

ALTER TABLE  answer ADD UNIQUE (student_id ,exam_id,question_id);

SELECT users.name as teacher_name,surname as teacher_surname,exam_id,exam.name,lesson,startDate,enddate,url
    FROM users
    INNER JOIN exam ON user_id=teacher_id
    WHERE  startdate < current_timestamp AND enddate > current_timestamp;

SELECT users.name as teacher_name,surname as teacher_surname,exam.name,lesson,startDate,enddate,url
    FROM users
    INNER JOIN exam ON user_id=teacher_id
    WHERE  startdate < current_timestamp AND enddate < current_timestamp;

SELECT users.name as teacher_name,surname as teacher_surname,exam.name,lesson,startDate,enddate,url
    FROM users
    INNER JOIN exam ON user_id=teacher_id
    WHERE  startdate > current_timestamp AND enddate > current_timestamp;

SELECT * FROM users
INNER JOIN exam ON user_id=teacher_id;

SELECT * FROM question
INNER JOIN exam e on question.exam_id = e.exam_id;

SELECT CURRENT_TIMESTAMP;

SELECT * FROM exam;

ALTER TABLE question ALTER COLUMN option_5 TYPE VARCHAR (300);

Delete FROM exam WHERE exam_id=6;

select * from users;