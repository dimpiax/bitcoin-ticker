/* @flow */

import mainModel from './models/main-model'

import currencyService from './services/currency-service'
import OutputService from './services/output-service'

import NotificationCenter, { Notification } from './managers/notification-center'

import System from './utils/system'
import Utils from './utils/utils'

const initSocket = (server: Object) => {
    const io = require('socket.io')(server)
    io.on('connection', (socket: Object) => {
        console.log('connected', socket.id)

        socket.on('disconnect', () => {
            console.log('disconnected', socket.id)
        })
    })

    NotificationCenter.setObserver(Notification.outputFeed, (data: Object) => {
        io.emit('data', data)
    })
}

const startRequesting = async (delay: number = 0): Promise<void> => {
    await Utils.delay(delay)

    try {
        const currenciesData = await currencyService.fetchData(System.args.currencies)

        const expireDuration = mainModel.expireRelationRateDuration
        const relationRate = await currencyService.getRelationRates(System.args.currencies, expireDuration)

        mainModel.currenciesData = currenciesData
        mainModel.relationRate = relationRate

        // show in console
        OutputService.showCurrencies(currenciesData, relationRate)

        // emit for clients
        NotificationCenter.post(Notification.outputFeed, OutputService.formatCurrencies(currenciesData, relationRate))

        startRequesting(System.args.interval)
    } catch (err) {
        throw err
    }
}

const init = (server: Object) => {
    initSocket(server)

    // start timer requesting
    // TODO: adapt under node-schedule
    startRequesting(System.args.delay)
}

export default {
    init
}
