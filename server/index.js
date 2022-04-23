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
const symptomsRouter = require('./routes/Symptoms');

var cors = require('cors');
app.use(cors());

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

//application/json
app.use(bodyParser.json({limit: "50mb"}));

const mongoose = require('mongoose');
const { Bookmark } = require('./models/Bookmark');
const { User } = require('./models/User');

mongoose.connect(`mongodb+srv://soyoung:${dbpw.mongodbpw}@cluster0.c7eeq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {})

.then(() => console.log('MongoDB Connected!!'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// var newUser = new User({
//       user_id : "ellie5508@naver.com",
// 			password : "1234",
// 			user_name : "seonae",
// 			gender : "여",
// 			birthday : 2022-02-04,
// 			gender : "female",
//       residence: " 의정부",
// 			user_diseases: [{
// 				"disease": '코로나',
// 			}],
//       user_family_list: [{
// 				"user_id": 'sypark041754@google.com',
//         "nickname": "소영",
// 			}]
// });

// newUser.save(function(error, data){
//   if(error){
//       console.log(error);
//   }else{
//       console.log('Saved!');
//   }
// });


app.use('/usersRouter', usersRouter);
app.use('/diseasesRouter', diseasesRouter);
app.use('/areasRouter', areasRouter);
app.use('/newsRouter', newsRouter);
app.use('/chatbotRouter', chatbotRouter);
app.use('/bookmarkRouter', bookmarkRouter);
app.use('/symptomsRouter', symptomsRouter);