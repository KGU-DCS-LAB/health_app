const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");
require('dotenv').config();
const dbpw = process.env;

const  usersRouter = require('./routes/Users');  // 추가된 코드

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
console.log(dbpw.mongodbpw);

mongoose.connect(`mongodb+srv://soyoung:${dbpw.mongodbpw}@cluster0.c7eeq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {})

.then(() => console.log('MongoDB Connected!!'))
.catch(err => console.log(err))

// var newUser = new User({user_id:'202212069', password:'1234', user_name:'박소영', birthday:'2000-04-17', gender:'female', residence:'서울시 관악구'});

// newUser.save(function(error, data){
//   if(error){
//       console.log(error);
//   }else{
//       console.log('Saved!');
//   }
// });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/usersRouter', usersRouter);