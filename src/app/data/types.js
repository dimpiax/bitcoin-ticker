/* @flow */

export type CurrencyCodeType = 'USD' | 'EUR' | 'GBP'

export type CurrencyType = {
    code: string,
    symbol: string,
    rate: string
}

export type RelationRateType = {
    base: string,
    rates: CurrencyType[]
}
