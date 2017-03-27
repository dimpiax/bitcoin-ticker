/* @flow */

import prequest from 'prequest-lite'

import Feed from '../data/feed'
import feedsService from './feeds-service'
import RelationRatesService from './relation-rate-service'

import type { RelationRateType } from '../data/types'

class CurrencyService {
    _relationRatesService: ?RelationRatesService

    async fetchData(currencies: string[]): Promise<Feed[]> {
        const feeds = feedsService.getTopicalFeeds()

        const feedsData = await Promise.all(
            feeds.map((el: Feed): Promise<Object> =>
                prequest({ uri: el.url, json: true })
                    .catch((e: Error): any => null)
                    .then((res: any): any => res)
            )
        )

        feeds.forEach((el: Feed, i: number) => {
            const feedData = feedsData[i]
            if (feedData) {
                el.setCurrencies(feedData, [...currencies])
            }
        })

        return feeds
    }

    async getRelationRates(currencies: string[], expireDuration: number): Promise<?RelationRateType> {
        if (currencies.length < 2) return null

        if (this._relationRatesService == null) {
            this._relationRatesService = new RelationRatesService()
        }

        this._relationRatesService.expireDuration = expireDuration

        try {
            return await this._relationRatesService.fetchData(currencies)
        } catch (err) {
            throw err
        }
    }
}

const instance = new CurrencyService()
export default instance
