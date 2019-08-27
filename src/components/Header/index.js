import React from 'react'
import { Row,Col } from 'antd';

import './index.less'
import Util from '../../utils/util'
import axios from '../../axios'

export default class Header extends React.Component{

    state = {}
    componentWillMount(){
        this.setState({
            userName: 'sb'
        })
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime())
            this.setState({
                sysTime
            })
        }, 1000)
        this.getWeatherAPIData()
    }
    getWeatherAPIData(){
        let city = '北京';
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status == 'success'){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
    }
    render(){
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col span="24">
                        <span>welcome..{this.state.userName}</span>
                        <a href='#'>exit</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span="4" className='breadcrumb-title'>
                        <span>首页</span>
                    </Col>
                    <Col span="20" className='weather'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather-img'>
                            <img src={this.state.dayPictureUrl}/>
                        </span>
                        <span className='weather-detail'>
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }

}

