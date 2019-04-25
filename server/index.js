require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authCtrl')
const treasureCtrl = require('./controllers/treasureCtrl')
const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  app.listen(SERVER_PORT, () => {console.log('listening on port:', SERVER_PORT)})
})

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))

// authCtrl endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

// authCtrl endpoints
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)