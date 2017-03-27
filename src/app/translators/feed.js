/* @flow */

import Currency from '../data/currency'
import Utils from '../utils/utils'

// abstract class
export default class FeedTranslator {
    processCurrencies(obj: Object, currencies: string[]): Currency[] {
        return []
    }

    transformRate(value: string, fixed: number = 4): string {
        const res = parseFloat(value).toFixed(fixed)
        return String(res)
    }
}

export class RelationRateFeedTranslator extends FeedTranslator {
    processCurrencies(obj: Object, currencies: string[]): Currency[] {
        return currencies.map((el: string): Currency => {
            let rate = Currency.NA

            if (Utils.isExistProperty(obj, el)) {
                rate = this.transformRate(obj[el])
            }

            return new Currency(el, '', rate)
        })
    }
}

export class BlockchainFeedTranslator extends FeedTranslator {
    processCurrencies(obj: Object, currencies: string[]): Currency[] {
        return currencies.map((el: string): Currency => {
            let symbol = '',
                rate = Currency.NA

            if (Utils.isExistProperty(obj, el)) {
                const data = obj[el]
                symbol = data.symbol
                rate = this.transformRate(data.buy)
            }

            return new Currency(el, symbol, rate)
        })
    }
}

export class CoindeskFeedTranslator extends FeedTranslator {
    processCurrencies(obj: Object, currencies: string[]): Currency[] {
        if (!Utils.isExistProperty(obj, 'bpi')) return []
        const bpi = obj.bpi

        return currencies.map((el: string): Currency => {
            let symbol = '',
                rate = Currency.NA

            if (Utils.isExistProperty(bpi, el)) {
                const data = bpi[el]
                symbol = data.symbol
                rate = this.transformRate(data.rate)
            }

            return new Currency(el, symbol, rate)
        })
    }
}
