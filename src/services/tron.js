const axios = require('axios')

const baseUrl = "https://apilist.tronscan.org/api"

async function getTronTransaction(hash) {
    try {
        const response = await axios.get(`${baseUrl}/transaction-info?hash=${hash}`)
        if (response.data.confirmed) {
            return {
                success: true,
                explorer: 'tron',
                data: {
                    confirmed: true,
                    receiver: response.data.toAddress,
                },
            }
        }

        return {
            success: false
        }
    } catch (e) {
        return {
            success: false,
            error: e.message,
        }
    }
}

module.exports = {
    getTronTransaction,
}