import React from 'react'
import './index.less'
export default class Home extends React.Component {

    render() {
        let style = {
            padding: 100
        }
        return (
            <div className="home-wrap">
                Home : 欢迎学习IMooc后台管理系统课程
            </div>
        );
    }
}