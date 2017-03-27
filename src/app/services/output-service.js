/* @flow */

import dateFormat from 'dateformat'
import colors from 'colors/safe'
import Table from 'cli-table'

import Currency from '../data/currency'
import Feed from '../data/feed'

import type { RelationRateType } from '../data/types'

export default class OutputService {
    static showCurrencies(data: Feed[], relationRate: ?RelationRateType) {
        let relationTable
        if (relationRate != null) {
            const currencyCode = relationRate.currency.code

            // build relation rates table output
            const relations = relationRate.currencies.map((c: Currency): string => `${colors.green(`${currencyCode}/${c.code}:`)} ${c.rate}`)

            relationTable = new Table()
            relationTable.push({ [colors.white.bold('Rates:')]: relations })
        }

        // build feed table output
        const firstFeedData = data[0]
        const currencyCode = firstFeedData.currency.code
        const currencies = data[0].currencies.map((el: Currency): string => colors.white.bold(`${currencyCode}/${el.code}`))
        const feed = data
            .map((el: Feed): Object => {
                const rates = el.currencies.map((c: Currency): string => c.rate)
                return { [colors.bold.green(el.name)]: rates }

                // const rates = el.currencies.map((c: Currency): string => `${colors.green(`${el.currency.code}/${c.code}:`)} ${c.rate}`)
                // return { [colors.bold.green(el.name)]: rates }
            })

        // add headers
        feed.unshift({ [colors.dim.yellow.bold('Feed')]: currencies })

        const feedTable = new Table()
        feed.forEach((el: Object) => { feedTable.push(el) })

        // output tables
        console.log(`\x1Bc${colors.bold.cyan('Bitcoin ticker')}`)
        console.log(`\nFeed at ${colors.dim(dateFormat(Date.now()))}`)
        if (relationTable != null) console.log(relationTable.toString())
        console.log(feedTable.toString())
    }

    static formatCurrencies(data: Feed[], relationRate: ?RelationRateType): { feed: { name: string, value: string[] }[], relations: ?string[] } {
        let relations
        if (relationRate != null) {
            const currencyCode = relationRate.currency.code

            // build relation rates table output
            relations = relationRate.currencies.map((c: Currency): string => `${currencyCode}/${c.code}: ${c.rate}`)
        }

        // build feed table output
        const feed = data
            .map((el: Feed): Object => {
                const rates = el.currencies.map((c: Currency): string => `${el.currency.code}/${c.code}: ${c.rate}`)
                return { name: el.name, value: rates }
            })

        return { feed, relations }
    }
}
