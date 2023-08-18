const express = require('express')
const { engine } = require('express-handlebars')
const logger = require('morgan')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/techscraperDb'
const routes = require('./routes')

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, (error) => {
  console.log(error || 'Mongoose connected to the DB successfully!')
})

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(routes)

// Start the server
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT)
})
