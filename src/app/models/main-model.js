/* @flow */

import Feed from '../data/feed'
import type { RelationRateType } from '../data/types'

class MainModel {
    currenciesData: Feed[]
    relationRate: RelationRateType
}

const instance = new MainModel()
export default instance
