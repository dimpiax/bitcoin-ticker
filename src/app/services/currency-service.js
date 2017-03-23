/* @flow */

import prequest from 'prequest-lite'

import Feed from '../data/feed'
import feedsService from './feeds-service'

class CurrencyService {
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
}

const instance = new CurrencyService()
export default instance
