const express = require('express')
const transactionsRouter = require('./routes/transactions/transactions')
const app = express()

app.use('/transactions', transactionsRouter)

app.listen(3000)