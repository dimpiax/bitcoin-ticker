/* @flow */

class CLIArguments {
    interval: number
    delay: number

    constructor(args: string[]) {
        this.interval = parseInt(this._findPair(args, ['--interval', '-i']) || 1000, 10)
        this.delay = parseInt(this._findPair(args, ['--delay', '-d']) || 0, 10)
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
const args = (): CLIArguments => cliArgs

export default {
    get args(): CLIArguments { return args() }
}
