const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const diaryRouter = require('./routers/diary')
const bodyParser = require('body-parser')
const path = require('path');

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(userRouter)
app.use(diaryRouter)


module.exports = app