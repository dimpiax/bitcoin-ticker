/* @flow */

import Currency from './currency'

import FeedTranslator from '../translators/feed'

export default class Feed {
    _name: string
    _currency: Currency
    _url: string
    _translator: FeedTranslator
    _currencies: Currency[]

    get name(): string { return this._name }
    get currency(): Currency { return this._currency }
    get url(): string { return this._url }
    get currencies(): Currency[] { return this._currencies }

    constructor(name: string, currency: Currency, url: string, translator: FeedTranslator) {
        this._name = name
        this._currency = currency
        this._url = url
        this._translator = translator
    }

    setCurrencies(el: Object, currencies: string[]) {
        this._currencies = this._translator.processCurrencies(el, currencies)
    }
}
