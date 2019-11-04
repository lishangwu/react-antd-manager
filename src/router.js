import React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'

import App from './App'
import Admin from './admin'
import Login from './pages/login'

import Home from './pages/home'
import Buttons from './pages/ui/buttons.js'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'

import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'

import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'

import City from './pages/city/index'

import RichText from './pages/rich/index'

import Order from './pages/order/index'
import OrderDetail from './pages/order/detail'

import User from './pages/user'
import BikeMap from './pages/map/bikeMap'

import Bar from './pages/echarts/bar'
import Line from './pages/echarts/line'
import Pie from './pages/echarts/pie'

import Common from './common'

import Nomatch from './pages/nomatch'

export default class IRouter extends React.Component {

    render() {
        return (
            <HashRouter>
                <App>
                    <Route path='/login' component={Login}></Route>

                    <Route path='/admin' render={() =>
                        <Admin>
                            <Switch>
                                <Route path='/admin/home' component={Home} />
                                {/* ui */}
                                <Route path='/admin/ui/buttons' component={Buttons} />
                                <Route path='/admin/ui/modals' component={Modals} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/notification" component={Notice} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route path="/admin/ui/tabs" component={Tabs} />
                                <Route path="/admin/ui/gallery" component={Gallery} />
                                <Route path="/admin/ui/carousel" component={Carousel} />
                                {/* form */}
                                <Route path="/admin/form/login" component={FormLogin} />
                                <Route path="/admin/form/reg" component={FormRegister} />
                                {/* table */}
                                <Route path="/admin/table/basic" component={BasicTable} />
                                <Route path="/admin/table/high" component={HighTable} />
                                {/* 富文本 */}
                                <Route path="/admin/rich" component={RichText} />
                                {/* 城市管理 */}
                                <Route path="/admin/city" component={City} />
                                {/* 订单管理 */}
                                <Route path="/admin/order" component={Order} />
                                {/* 员工管理 */}
                                <Route path="/admin/user" component={User} />
                                {/* 车辆地图 */}
                                <Route path="/admin/bikeMap" component={BikeMap} />
                                {/* 柱形图 */}
                                <Route path="/admin/charts/bar" component={Bar} />
                                {/* 柱形图 */}
                                <Route path="/admin/charts/line" component={Line} />
                                {/* 柱形图 */}
                                <Route path="/admin/charts/pie" component={Pie} />

                                <Route component={Nomatch} />

                            </Switch>

                        </Admin>
                    }></Route>

                    <Route path='/common' render={() => 
                            <Common>
                            {
                                <Route path='/common/order/detail/:orderId' component={OrderDetail} />
                            }
                            </Common>
                    }></Route>
                </App>
            </HashRouter>
        )
    }
}