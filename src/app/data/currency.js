/* @flow */

export default class Currency {
    static get NA(): string { return 'N/A' }

    _code: string
    _symbol: string
    _rate: string

    get code(): string { return this._code }
    get symbol(): string { return this._symbol }
    get rate(): string { return this._rate }

    constructor(code: string, symbol: string = '', rate: string = '') {
        this._code = code
        this._symbol = symbol
        this._rate = rate
    }
}
