const express = require('express')
const app = express()
const port = 5000
// const bodyParser = require('body-parser');
const { User } = require("./models/User");

// //application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

// //application/json
// app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://seonae:NewSt@healthapp.osrcs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {})
.then(() => console.log('MongoDB Connected!!'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})