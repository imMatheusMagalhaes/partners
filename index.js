require('dotenv').config()
const connectDB = require('./src/configs/db')
const startServer = require('./src/server')

connectDB()
startServer()