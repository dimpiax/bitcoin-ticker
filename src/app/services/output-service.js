/* @flow */

import dateFormat from 'dateformat'
import colors from 'colors/safe'
import Table from 'cli-table'

import type { CurrencyType, RelationRateType } from '../data/types'
import Feed from '../data/feed'

export default class OutputService {
    static showCurrencies(data: Feed[], relationRate: RelationRateType) {
        // build relation rates table output
        const groupedRelativeRates = relationRate.rates.map((c: CurrencyType): string => `${relationRate.base}/${c.code}: ${c.rate}`)

        const table = new Table()
        table.push({ 'Rates:': groupedRelativeRates })

        // build feed table output
        const feeds = data
            .map((el: Feed): Object => {
                const rates = el.currencies.map((c: CurrencyType): string => `${colors.green(`${el.baseCode}/${c.code}`)}: ${c.rate}`)
                return { [colors.bold.green(el.name)]: rates }
            })

        const feedTable = new Table()
        feeds.forEach((el: Object) => { feedTable.push(el) })

        // output tables
        console.log(`\nFeed at ${colors.dim(dateFormat(Date.now()))}`)
        console.log(table.toString())
        console.log(feedTable.toString())
        console.log('---')
    }
}
