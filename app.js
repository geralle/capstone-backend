const express = require('express')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const path = require('path')
const methodOverride = require('method-override')
const port = process.env.PORT || 8000
const app = express()
const cors = require('cors')

const index = require('./routes/index')
let cookieKey = process.env.COOKIE_KEY || 'keyboard cat'

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(cookieSession({
  name: 'usersId',
  keys: [cookieKey],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.use('/', index)

app.listen(port, data =>{
  console.log("listening on... http://localhost:"+port)
})

module.exports = app;
