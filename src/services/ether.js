const axios = require('axios')

const etherBaseUrl = "https://api.etherscan.io/api"
const bscBaseUrl = "https://api.bscscan.com/api"

async function getEtherOrBscTransaction(hash, isEther) {
    try {
        const apiKey = isEther ? process.env.ETHERSCAN_KEY : process.env.BSCSCAN_KEY
        const baseUrl = isEther ? etherBaseUrl : bscBaseUrl

        const response = await axios.get(`${baseUrl}?module=proxy&action=eth_getTransactionReceipt&txhash=${hash}&apiKey=${apiKey}`)

        if (response.data.result && response.data.result.status === "0x1") {
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
                }
            }
        }
    } catch (e) {
        return {
            success: false,
            error: e.message,
        }
    }
}

module.exports = {
    getEtherTransaction: getEtherOrBscTransaction,
}