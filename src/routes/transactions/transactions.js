const express = require('express')
const { getAlgoTransaction } = require('../../services/algo')
const { getEtherOrBscTransaction } = require('../../services/ether')
const { getOmniTransaction } = require('../../services/omni')
const { getTronTransaction } = require('../../services/tron')

const transactionsRouter = express.Router()

transactionsRouter.get('/', transactionStatus)

async function transactionStatus(req, res) {
    const { hash } = req.query

    const results = await Promise.allSettled([
        getAlgoTransaction(hash),
        getEtherOrBscTransaction(hash, false),
        getOmniTransaction(hash),
        getTronTransaction(hash)
    ])

    for (const result of results) {
        console.log(result)
        if (result.value.success) {
            return res.json(result.value)
        }
    }

    return res.status(404).json({
        success: false,
        error: "transaction not found in any explorer"
    })
}

module.exports = transactionsRouter
