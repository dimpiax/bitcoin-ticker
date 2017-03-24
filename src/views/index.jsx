/* @flow */

import React from 'react'

import DefaultLayout from './layouts/default.jsx'

export default class Test extends React.Component {
    render(): React.Element<*> {
        return (
            <DefaultLayout title="Bitcoin ticker">
                <div>Hello {this.props.test}</div>
            </DefaultLayout>
        )
    }
}
