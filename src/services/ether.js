const axios = require('axios')

const baseUrl = "https://api.etherscan.io/api"

async function getEtherTransaction(hash) {
    try {
        const response = await axios.get(`${baseUrl}?module=proxy&action=eth_getTransactionReceipt&txhash=${hash}&apiKey=${process.env.ETHERSCAN_KEY}`)
        if (response.data.result != null && response.data.result.status === "0x1") {
            return {
                success: true,
                data: {
                    confirmed: true,
                    receiver: response.data.result.to,
                },
            }
        } else {
            return {
                success: false,
                data: {
                    confirmed: false,
                    receiver: response.data.result.to,
                }
            }
        }
    } catch (e) {
        return {
            success: false,
            error: e,
        }
    }
}

module.exports = {
    getEtherTransaction,
}