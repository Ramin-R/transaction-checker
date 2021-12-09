const express = require('express')

const transactionsRouter = express.Router()

transactionsRouter.get('/', transactionStatus)

async function transactionStatus(req, res) {
    return res.status(200).json({
        status: "Ok"
    })
}

module.exports = transactionsRouter
