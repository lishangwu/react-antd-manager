import React from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import About from './../route1/About'
import Main from './../route1/Main'
import Topic from './../route1/Topic'

import Home from './Home'

export default class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <Home>
                    <Switch>
                        <Route exact={true} path="/" component={Main} />
                        <Route exact={true} path="/about" component={About} />
                        <Route exact={true} path="/topics" component={Topic} />
                    </Switch>
                </Home>
            </Router>
        )
    }
}