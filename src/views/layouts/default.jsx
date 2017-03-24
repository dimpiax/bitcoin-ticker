/* @flow */

import React from 'react'

export default class DefaultLayout extends React.Component {
    render(): React.Element<*> {
        return (
            <html>
                <head>
                    <title>{ this.props.title }</title>
                </head>

                <body>
                    { this.props.children }

                    <script src="/socket.io/socket.io.js"/>
                    <script dangerouslySetInnerHTML={{__html: `
                        var socket = io();
                        socket.on('data', (data) => {
                            console.log('data:', data)
                        })
                    `}}/>
                </body>
            </html>
        )
    }
}
