/* @flow */

import type { CurrencyType } from '../data/types'

import FeedTranslator from '../decoders/feed'

export default class Feed {
    _name: string
    _url: string
    _translator: FeedTranslator
    _currencies: CurrencyType[]

    get name(): string { return this._name }
    get url(): string { return this._url }
    get currencies(): CurrencyType[] { return this._currencies }

    constructor(name: string, url: string, translator: FeedTranslator) {
        this._name = name
        this._url = url
        this._translator = translator
    }

    setCurrencies(el: Object) {
        this._currencies = this._translator.processCurrencies(el)
    }
}
