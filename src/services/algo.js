const axios = require('axios')

const baseUrl = "https://algoexplorerapi.io/v2"

async function getAlgoTransaction(hash) {
    try {
        const response = await axios.get(`${baseUrl}/transactions/pending/${hash}?format=json`)
        if (response.status === 200 && response.data['confirmed-round'] > 0) {
            return {
                success: true,
                explorer: 'algo',
                data: {
                    confirmed: true,
                    receiver: response.data.txn.txn.arcv,
                },
            }
        }

        return {
            success: true,
            explorer: 'algo',
            data: {
                confirmed: false,
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
    getAlgoTransaction,
}