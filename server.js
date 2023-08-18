const express = require('express')
const { engine } = require('express-handlebars')
const logger = require('morgan')
const database = require('./config/connection.js')
const routes = require('./routes')

const PORT = process.env.PORT || 3000
const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(routes)

// Connect to the MongoDB & Start the server
database.once('open', () => {
  console.log('MongoDB database connection succesful')
  app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT)
  })
});