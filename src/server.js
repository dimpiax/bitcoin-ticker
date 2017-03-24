/* @flow */

import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'

import application from './app'

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())

app.use('/watch', require('./app/routes/watch').default)

process.on('unhandledRejection', (e: string) => { console.error('rejection:', e) })

const httpServer = app.listen(3000, () => {
    console.log(`HTTP Server. Listening to port ${httpServer.address().port}`)

    application.init()
})
