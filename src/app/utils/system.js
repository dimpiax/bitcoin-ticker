/* @flow */

class CLIArguments {
    _interval: number
    _delay: number
    _currencies: string[]

    get interval(): number { return this._interval }
    get delay(): number { return this._delay }
    get currencies(): string[] { return [...this._currencies] }

    constructor(args: string[]) {
        this._interval = parseInt(this._findPair(args, ['--interval', '-i']) || 1000, 10)
        this._delay = parseInt(this._findPair(args, ['--delay', '-d']) || 0, 10)
        this._currencies = (this._findPair(args, ['--curr', '-c']) || 'USD,EUR').split(',')
    }

    _findPair(base: string[], keysCase: string[]): ?string {
        const index = base.findIndex((el: string): boolean => keysCase.indexOf(el) !== -1)
        if (index === -1) return null

        if (index === base.length - 1) return 'true'
        if (base[index + 1].indexOf('-') === 0) return 'true'

        return base[index + 1]
    }
}

const cliArgs = new CLIArguments(process.argv.slice(2))

export default {
    get args(): CLIArguments { return cliArgs }
}
