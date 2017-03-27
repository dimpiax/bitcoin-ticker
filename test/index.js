import { expect } from 'chai'

import Currency from '../src/app/data/currency'
import Feed from '../src/app/data/feed'
import FeedsService from '../src/app/services/feeds-service'

describe('Feeds service', () => {
    it('should have BTC currencies', () => {
        console.log(FeedsService.getTopicalFeeds())

        FeedsService.getTopicalFeeds().forEach((el: Feed) => {
            expect(el).to.have.property('currency')
            expect(el.currency).to.be.an.instanceof(Currency)
            expect(el.currency.code).to.contain('BTC')
        })
    })
})
