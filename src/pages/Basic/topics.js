import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Topic from './topic'

export default class index extends React.Component {
    render() {
        return (
            <div>
                <h2>topics..</h2>
                <ul>
                    <li>
                        <Link to={`${this.props.match.url}/aa`}>aa..</Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/bb`}>bb..</Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/cc`}>cc..</Link>
                    </li>
                </ul>
                <hr />
                <Route exact path={this.props.match.path + '/:id'} component={Topic} ></Route>
                <hr />
                <Route exact path={this.props.match.path} render={() => <h3>please input a topic</h3>}></Route>
            </div>
        )
    }
}