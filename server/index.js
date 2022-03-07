const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
require('dotenv').config();
const dbpw = process.env;

const  newsRouter = require('./routes/news');
const usersRouter = require('./routes/Users'); // 추가된 코드
const diseasesRouter = require('./routes/Diseases');
const areasRouter = require('./routes/Areas');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
console.log(dbpw.mongodbpw);

mongoose.connect(`mongodb+srv://soyoung:${dbpw.mongodbpw}@cluster0.c7eeq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {})

.then(() => console.log('MongoDB Connected!!'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/usersRouter', usersRouter);
app.use('/diseasesRouter', diseasesRouter);
app.use('/areasRouter', areasRouter);
app.use('/newsRouter', newsRouter);