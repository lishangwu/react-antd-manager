import React from 'react'

export default class Topic extends React.Component{
    render(){
        return(
            <div>
                <h1>topic.....{this.props.match.params.id}</h1>
            </div>
        )
    }
}