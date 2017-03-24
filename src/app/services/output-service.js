/* @flow */

import dateFormat from 'dateformat'
import colors from 'colors/safe'
import Table from 'cli-table'

import type { CurrencyType, RelationRateType } from '../data/types'
import Feed from '../data/feed'

export default class OutputService {
    static showCurrencies(data: Feed[], relationRate: RelationRateType) {
        // build relation rates table output
        const relations = relationRate.rates.map((c: CurrencyType): string => `${relationRate.base}/${c.code}: ${c.rate}`)

        const relationTable = new Table()
        relationTable.push({ 'Rates:': relations })

        // build feed table output
        const feed = data
            .map((el: Feed): Object => {
                const rates = el.currencies.map((c: CurrencyType): string => `${colors.green(`${el.baseCode}/${c.code}`)}: ${c.rate}`)
                return { [colors.bold.green(el.name)]: rates }
            })

        const feedTable = new Table()
        feed.forEach((el: Object) => { feedTable.push(el) })

        // output tables
        console.log(`\x1Bc${colors.bold.cyan('Bitcoin ticker')}`)
        console.log(`\nFeed at ${colors.dim(dateFormat(Date.now()))}`)
        console.log(relationTable.toString())
        console.log(feedTable.toString())
    }

    static formatCurrencies(data: Feed[], relationRate: RelationRateType): { feed: { name: string, value: string[] }[], relations: string[] } {
        // build relation rates table output
        const relations = relationRate.rates.map((c: CurrencyType): string => `${relationRate.base}/${c.code}: ${c.rate}`)

        // build feed table output
        const feed = data
            .map((el: Feed): Object => {
                const rates = el.currencies.map((c: CurrencyType): string => `${el.baseCode}/${c.code}: ${c.rate}`)
                return { name: el.name, value: rates }
            })

        return { feed, relations }
    }
}
