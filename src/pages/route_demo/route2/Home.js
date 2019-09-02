import React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Home2</Link>
                    </li>
                    <li>
                        <Link to="/about">About2</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics2</Link>
                    </li>
                </ul>
                <hr />
                {this.props.children}
            </div>
        )
    }
}