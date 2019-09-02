import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Home from './home'
import About from './about'
import Topics from './topics'


export default class BasicExample extends React.Component {
    render() {
        return (
            <BrowserRouter>
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
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/about' component={About}></Route>
                    <Route  path='/topics' component={Topics}></Route>


                </div>
            </BrowserRouter>
        )
    }
}