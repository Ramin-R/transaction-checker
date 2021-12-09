const axios = require('axios')

const baseUrl = "https://api.omniexplorer.info/v1"

async function getOmniTransaction(hash) {
    try {
        const response = await axios.get(`${baseUrl}/transaction/tx/${hash}`)
        if (!response.data.type.startsWith('Error')) {
            return {
                success: true,
                data: {
                    confirmed: response.data.confirmations > 0,
                    receiver: response.data.referenceaddress,
                },
            }
        } else {
            return {
                success: true,
                data: {
                    confirmed: false,
                },
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
    getOmniTransaction,
}