const express = require('express')
const transactionsRouter = require('./routes/transactions/transactions')
require('dotenv').config()

const app = express()

app.use('/transactions', transactionsRouter)

const PORT = process.env.PORT ? process.env.PORT : 3000

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})