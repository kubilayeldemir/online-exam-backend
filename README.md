# online-exam-backend
Back-end of online exam system made with express.js and postgresql.

## Installation
You need to create your database on your own.
Use sql-code-used-to-create-db.sql file to create your database schema.

Be careful, there are some alter table codes there.

run npm install

to run the project
```
node index.js
OR
nodemon index.js
```

Create a .env file on root of your project which includes properties below
## Env
```
DATABASE_URL=random String For Homepage Request just for fun
DATABASE=Db Name
USER=yourDb Username
HOST=Host of your db.
PASSWORD=Password of your db.
SSL=true or false depends on your database location. if you are using localhost set ssl false.
```

Env file i am using for postgresql on localhost.
```python
DATABASE_URL=Helloo
DATABASE=postgres
USER=postgres
HOST=localhost
PASSWORD=mypassword
SSL=false
```

## Extra information
I used a simple authentication service made by me. You can disable it via commenting the code below in index.js
```app.use(basicAuthentication);```
## License
[MIT](https://choosealicense.com/licenses/mit/)