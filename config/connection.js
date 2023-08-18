const { connect, connection } = require('mongoose')

// MONGODB_URI will be MongoDB Cloud Atlas when deployed on Heroku or looks for local a mongoDB techScraperDB database
const DB_CONNECTION_STRING = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techscraperDb'

connect(DB_CONNECTION_STRING)

module.exports = connection
