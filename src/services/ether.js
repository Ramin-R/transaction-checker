const axios = require('axios')

const etherBaseUrl = "https://api.etherscan.io/api"
const bscBaseUrl = "https://api.bscscan.com/api"

async function getEtherOrBscTransaction(hash, isEther) {
    try {
        const apiKey = isEther ? process.env.ETHERSCAN_KEY : process.env.BSCSCAN_KEY
        const baseUrl = isEther ? etherBaseUrl : bscBaseUrl

        const response = await axios.get(`${baseUrl}?module=proxy&action=eth_getTransactionReceipt&txhash=${hash}&apiKey=${apiKey}`)

        const explorer =  isEther ? 'ether' : 'bsc'

        if (response.data.result && response.data.result.status === "0x1") {
            return {
                success: true,
                explorer,
                data: {
                    confirmed: true,
                    receiver: response.data.result.to,
                },
            }
        } else if (response.data.result) {
            return {
                success: true,
                explorer,
                data: {
                    confirmed: false,
                    receiver: response.data.result.to,
                }
            }
        }

        return {
            success: false,
        }

    } catch (e) {
        return {
            success: false,
            error: e.message,
        }
    }
}

module.exports = {
    getEtherOrBscTransaction,
}