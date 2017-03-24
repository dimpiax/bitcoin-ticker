/* @flow */

import EventEmitter from 'events'

export class Notification {
    static get outputFeed(): Notification { return new Notification('outputFeed') }

    name: string

    constructor(name: string) {
        this.name = name
    }
}

class NotificationCenter {
    static _emitter: EventEmitter = new EventEmitter()

    static setObserver(notification: Notification, callback: ({ data: Object }) => void) {
        NotificationCenter.removeObserver(notification, callback)
        NotificationCenter.addObserver(notification, callback)
    }

    static addObserver(notification: Notification, callback: ({ data: Object }) => void) {
        NotificationCenter._emitter.on(notification.name, callback)
    }

    static removeObserver(notification: Notification, callback: ({ data: Object }) => void) {
        NotificationCenter._emitter.removeListener(notification.name, callback)
    }

    static post(notification: Notification, data: Object) {
        NotificationCenter._emitter.emit(notification.name, data)
    }
}

export default NotificationCenter
