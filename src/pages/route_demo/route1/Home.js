import React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import About from './About'
import Main from './Main'
import Topic from './Topic'


export default class Home extends React.Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                    </ul>
                    <hr />
                    <Switch>
                        <Route exact={true} path="/" component={Main} />
                        <Route exact={true} path="/about" component={About} />
                        <Route exact={true} path="/topics" component={Topic} />
                    </Switch>
                    
                </div>
            </HashRouter>
        )
    }
}