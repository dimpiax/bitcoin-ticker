/* @flow */

import prequest from 'prequest-lite'

import Currency from '../data/currency'
import { RelationRateFeedTranslator } from '../translators/feed'

import type { RelationRateType } from '../data/types'

export default class RelationRateService {
    expireDuration: number
    _relations: RelationRateType
    _relationRatesExpireTimestamp: ?number

    async fetchData(currenciesCodes: string[]): Promise<RelationRateType> {
        const [head, ...tail] = currenciesCodes

        if (this._relationRatesExpireTimestamp != null) {
             // not expired
            if (this._relationRatesExpireTimestamp - Date.now() > 0) return this._relations
        }

        try {
            const res = await prequest({ uri: 'http://api.fixer.io/latest', qs: { base: head, symbols: tail.join() }, json: true })
            if (res.error != null) {
                throw new Error(`${res.error}. ${head} is not correct currency for 'api.fixer.io' service. Check their specification.`)
            }

            const translator = new RelationRateFeedTranslator()
            const currencies = translator.processCurrencies(res.rates, tail)

            this._relations = { currency: new Currency(res.base, '', ''), currencies }
            this._relationRatesExpireTimestamp = Date.now() + this.expireDuration

            return this._relations
        } catch (err) {
            if (this._relationRates != null) {
                // in case of error it returns previous fetched data
                return this._relations
            }

            throw err
        }
    }
}
