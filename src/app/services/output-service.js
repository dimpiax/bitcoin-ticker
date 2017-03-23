/* @flow */

import Feed from '../data/feed'

export default class OutputService {
    static showCurrencies(data: Feed[]) {
        console.log(data)
    }
}
