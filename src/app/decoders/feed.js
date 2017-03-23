/* @flow */

import type { CurrencyType } from '../data/types'

// abstract class
export default class FeedTranslator {
    processCurrencies(obj: Object, allowedCurrencies: string[] = ['USD', 'EUR']): CurrencyType[] {
        return []
    }
}

export class BlockchainFeedTranslator extends FeedTranslator {
    processCurrencies(obj: Object, allowedCurrencies: string[] = ['USD', 'EUR']): CurrencyType[] {
        return Object.keys(obj)
            .filter((el: string): boolean => {
                const index = allowedCurrencies.findIndex((cur: string): boolean => cur === el)
                const isFound = index !== -1

                // remove found element from whitelist
                if (isFound) {
                    allowedCurrencies.splice(index, 1)
                }

                return isFound
            })
            .map((el: string): CurrencyType => {
                const value = obj[el]
                return { code: el, symbol: value.symbol, rate: value.buy }
            })
            .filter(Boolean)
    }
}

export class CoindeskFeedTranslator extends FeedTranslator {
    processCurrencies(obj: Object, allowedCurrencies: string[] = ['USD', 'EUR']): CurrencyType[] {
        if (!Object.prototype.hasOwnProperty.call(obj, 'bpi')) return []
        const bpi = obj.bpi

        return Object.values(bpi)
            .filter((el: any): boolean => {
                const index = allowedCurrencies.findIndex((cur: string): boolean => cur === el.code)
                const isFound = index !== -1

                // remove found element from whitelist
                if (isFound) {
                    allowedCurrencies.splice(index, 1)
                }

                return isFound
            })
            .map((el: any): CurrencyType => ({ code: el.code, symbol: el.symbol, rate: el.rate }))
            .filter(Boolean)
    }
}
