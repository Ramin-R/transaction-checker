const axios = require('axios')

const baseUrl = "https://apilist.tronscan.org/api"

async function getTronTransaction(hash) {
    try {
        const response = await axios.get(`${baseUrl}/transaction-info?hash=${hash}`)
        return {
            success: true,
            data: {
                confirmed: response.data.confirmed,
                receiver: response.data.toAddress,
            },
        }
    } catch (e) {
        return {
            success: false,
            error: e,
        }
    }
}

module.exports = {
    getTronTransaction,
}