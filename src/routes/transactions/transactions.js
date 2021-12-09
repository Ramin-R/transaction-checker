const express = require('express')
const { getAlgoTransaction } = require('../../services/algo')
const { getEtherOrBscTransaction } = require('../../services/ether')
const { getOmniTransaction } = require('../../services/omni')
const { getTronTransaction } = require('../../services/tron')

const transactionsRouter = express.Router()

transactionsRouter.get('/', transactionStatus)

async function transactionStatus(req, res) {
    const { hash, explorer } = req.query

    let result

    switch (explorer) {
        case "algo":
            result = await getAlgoTransaction(hash)
            break
        case "bsc":
            result = await getEtherOrBscTransaction(hash, false)
            break
        case "ether":
            result = await getEtherOrBscTransaction(hash, true)
            break
        case "omni":
            result = await getOmniTransaction(hash)
            break
        case "tron":
            result = await getTronTransaction(hash)
            break
        default:
            result = { success: false, error: "Invalid or unsupported explorer" }
    }

    return res.json(result)
}

module.exports = transactionsRouter
