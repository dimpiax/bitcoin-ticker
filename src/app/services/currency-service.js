/* @flow */

import prequest from 'prequest-lite'

import Feed from '../data/feed'
import feedsService from './feeds-service'

import type { CurrencyCodeType, CurrencyType, RelationRateType } from '../data/types'

class CurrencyService {
    _relationRates: RelationRateType
    _relationRatesExpireTimestamp: ?number

    async fetchData(): Promise<Feed[]> {
        const feeds = feedsService.getTopicalFeeds()
        const feedsData = await Promise.all(
            feeds.map((el: Feed): Promise<Object> => prequest({ uri: el.url, json: true }))
        )

        feeds.forEach((el: Feed, i: number) => {
            const feedData = feedsData[i]
            el.setCurrencies(feedData)
        })

        return feeds
    }

    async getRelationRates(lhs: CurrencyCodeType, rhs: CurrencyCodeType[]): Promise<RelationRateType> {
        if (this._relationRatesExpireTimestamp != null) {
             // not expired
            if (this._relationRatesExpireTimestamp - Date.now() > 0) return this._relationRates
        }

        try {
            const res = await prequest({ uri: 'http://api.fixer.io/latest', qs: { base: lhs, symbols: rhs.join() }, json: true })
            const ratesData = res.rates
            const rates = Object.keys(ratesData)
                .map((el: string): CurrencyType => (
                    { code: el, symbol: '', rate: `${ratesData[el]}` }
                ))

            this._relationRates = { base: res.base, rates }
            this._relationRatesExpireTimestamp = Date.now() + (1000 * 60 * 60 * 12)

            return this._relationRates
        } catch (err) {
            if (this._relationRates != null) {
                // in case of error it returns previous fetched data
                return this._relationRates
            }

            throw err
        }
    }
}

const instance = new CurrencyService()
export default instance
