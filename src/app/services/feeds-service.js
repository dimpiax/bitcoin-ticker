/* @flow */

import Currency from '../data/currency'

import Feed from '../data/feed'
import { BlockchainFeedTranslator, CoindeskFeedTranslator } from '../translators/feed'

type FeedType = 'Blockchain' | 'CoinDesk'

class FeedsService {
    _feeds: Feed[]

    getTopicalFeeds(): Feed[] {
        const allowedFeeds = ['Blockchain', 'CoinDesk']
        return allowedFeeds.map(this._getFeed)
    }

    _getFeed(name: FeedType): Feed {
        switch (name) {
            case 'Blockchain': return new Feed(name, new Currency('BTC'), 'https://blockchain.info/ticker', new BlockchainFeedTranslator())
            case 'CoinDesk': return new Feed(name, new Currency('BTC'), 'http://api.coindesk.com/v1/bpi/currentprice.json', new CoindeskFeedTranslator())

            default: throw new Error(`Unknown feed ${name}`)
        }
    }
}

const instance = new FeedsService()
export default instance
