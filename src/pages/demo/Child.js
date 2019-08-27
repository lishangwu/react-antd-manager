import React from 'react'
import './index.less'

export default class index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    
    componentWillMount(){
        console.log('will mount');
    }
    componentDidMount(){
        console.log('did mount');
    }
    componentWillReceiveProps(p){
        console.log('will props ', p);
    }
    shouldComponentUpdate(){
        console.log('should update');
        return true
    }
    componentWillUpdate(){
        console.log('will update');
    }
    componentDidUpdate(){
        console.log('did update');
    }


    render() {
        let style = {
            padding: 100
        }
        return (
            <div style={style}>
                <p>{this.props.name}</p>
            </div>
        );
    }
}