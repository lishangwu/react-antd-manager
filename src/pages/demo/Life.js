import React from 'react'
import Child from './Child'
// import Button from 'antd/es/button'
import {Button, Input} from 'antd'
// import 'antd/dist/antd.css'
export default class index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    handleAdd1 = () => {
        this.setState({
            count: ++this.state.count
        })
    }
    handleAdd2() {
        this.setState({
            count: this.state.count + 1
        })
   } 

    render() {
        let style = {
            padding: 100
        }
        return (
            <div style={style}>
                <p>react life</p>
                <Input value='123'></Input>
                <Button type="" onClick={this.handleAdd1}>button..1</Button>
                <Button type="primary" onClick={this.handleAdd2.bind(this)}>button..2</Button>
                <p>Life: {this.state.count}</p>
                <Child name={this.state.count}></Child>
            </div>
        );
    }
}