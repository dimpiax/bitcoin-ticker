/* @flow */

import currencyService from './services/currency-service'
import OutputService from './services/output-service'
import Utils from './utils/utils'

const startRequesting = async (delay: number): Promise<void> => {
    await Utils.delay(delay)

    try {
        const data = await currencyService.fetchData()
        OutputService.showCurrencies(data)
    } catch (err) {
        throw err
    }
}

const init = () => {
    // start timer requesting
    // TODO: adapt under node-schedule
    startRequesting(1000)
}

export default {
    init
}
