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
                </body>
            </html>
        )
    }
}
