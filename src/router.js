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
// import OrderDetail from './pages/order/detail'
import Common from './common'

import Nomatch from './pages/nomatch'

export default class IRouter extends React.Component {

    render() {
        return (
            <HashRouter>
                <App>
                    <Route path='/login' component={Login}></Route>

                    <Route path='/' render={() =>
                        <Admin>
                            <Switch>
                                <Route path='/home' component={Home} />
                                {/* ui */}
                                <Route path='/ui/buttons' component={Buttons} />
                                <Route path='/ui/modals' component={Modals} />
                                <Route path="/ui/loadings" component={Loadings} />
                                <Route path="/ui/notification" component={Notice} />
                                <Route path="/ui/messages" component={Messages} />
                                <Route path="/ui/tabs" component={Tabs} />
                                <Route path="/ui/gallery" component={Gallery} />
                                <Route path="/ui/carousel" component={Carousel} />
                                {/* form */}
                                <Route path="/form/login" component={FormLogin} />
                                <Route path="/form/reg" component={FormRegister} />
                                {/* table */}
                                <Route path="/table/basic" component={BasicTable} />
                                <Route path="/table/high" component={HighTable} />
                                {/* 富文本 */}
                                <Route path="/rich" component={RichText} />
{/*
    <Route path="/city" component={City} />

    

    <Route path="/order" component={Order} />
                                

    */
}
                                <Route component={Nomatch} />

                            </Switch>

                        </Admin>
                    }></Route>

                    <Route path='/common' render={() => {
                        return (
                            <Common>
                            {
                                // <Route path='/common/order/detail/:orderId' component={OrderDetail} />
                            }
                            </Common>
                        )
                    }}></Route>
                </App>
            </HashRouter>
        )
    }
}