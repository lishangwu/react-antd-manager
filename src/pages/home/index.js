import React from 'react'
import './index.less'
export default class Home extends React.Component {

    render() {
        let style = {
            padding: 100
        }
        return (
            <div className="home-wrap">
                Home : <h1>this is home</h1> 
            </div>
        );
    }
}