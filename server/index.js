const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
require('dotenv').config();
const dbpw = process.env;

const  newsRouter = require('./routes/news');
const usersRouter = require('./routes/Users');
const diseasesRouter = require('./routes/Diseases');
const areasRouter = require('./routes/Areas');
const chatbotRouter = require('./routes/Chatbot');
const bookmarkRouter = require('./routes/Bookmark');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

//application/json
app.use(bodyParser.json({limit: "50mb"}));

const mongoose = require('mongoose');

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
app.use('/chatbotRouter', chatbotRouter);
app.use('/bookmarkRouter', bookmarkRouter);