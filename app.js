const express = require('express')
const dotenv = require('dotenv') // Module which reads the env. variables from .env file
const indexRouter = require('./routes/index')
const app = express()

dotenv.config()
app.use(express.json())
// Routes the request to index file
app.use('/', indexRouter)

// Server listening on a PORT. PORT is set in the .env file
// eslint-disable-next-line no-console
app.listen(process.env.PORT, () => console.log(`Server started listening on port ${process.env.PORT}`))

module.exports = app
