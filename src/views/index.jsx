/* @flow */

import React from 'react'

import DefaultLayout from './layouts/default.jsx'

export default class Test extends React.Component {
    render(): React.Element<*> {
        return (
            <div>
                <DefaultLayout title={ this.props.title }>
                    <h3><p id='date'/></h3>
                    <p id='relations'/>
                    <div id='feed'/>
                </DefaultLayout>

                <script src="/socket.io/socket.io.js"/>
                <script dangerouslySetInnerHTML={{__html: `
                    const dateDiv = document.getElementById('date');
                    const relationsDiv = document.getElementById('relations');
                    const feedDiv = document.getElementById('feed');

                    const socket = io();
                    socket.on('data', (data) => {
                        const date = new Date(Date.now())
                        dateDiv.innerHTML = date.toString()

                        relationsDiv.innerHTML = '<b>Rate:</b> ' + data.relations

                        feedDiv.innerHTML = ''
                        data.feed.forEach(el => {
                            feedDiv.innerHTML += '<b>' + el.name + ':</b> ' + el.value.join(', ') + '<br/>'
                        })
                    })
                `}} />
            </div>
        )
    }
}
