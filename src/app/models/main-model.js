/* @flow */

import Feed from '../data/feed'
import type { RelationRateType } from '../data/types'

class MainModel {
    currenciesData: Feed[]
    relationRate: ?RelationRateType

    expireRelationRateDuration: number = 1000 * 60 * 60 * 12
}

const instance = new MainModel()
export default instance
