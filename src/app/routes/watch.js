/* @flow */

import express from 'express'

import NotificationCenter, { Notification } from '../managers/notification-center'

const router = express.Router()

router.route('/')
    .get((req: Object, res: Object) => {
        res.header('Content-Type', 'text/event-stream')
        res.header('Cache-Control', 'no-cache')
        res.header('Connection', 'keep-alive')

        const listener = (data: Object) => {
            res.write(JSON.stringify(data))
        }

        NotificationCenter.setObserver(Notification.outputFeed, listener)

        req.socket.on('close', () => {
            NotificationCenter.removeObserver(Notification.outputFeed, listener)
        })
    })

export default router
