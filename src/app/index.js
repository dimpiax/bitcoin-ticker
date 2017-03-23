/* @flow */

import currencyService from './services/currency-service'
import OutputService from './services/output-service'
import Utils from './utils/utils'

const startRequesting = async (delay: number = 0): Promise<void> => {
    await Utils.delay(delay)

    try {
        const data = await currencyService.fetchData()
        const relationRate = await currencyService.getRelationRates('EUR', ['USD'])
        OutputService.showCurrencies(data, relationRate)

        startRequesting(1000 * 10)
    } catch (err) {
        throw err
    }
}

const init = () => {
    // start timer requesting
    // TODO: adapt under node-schedule
    startRequesting()
}

export default {
    init
}
