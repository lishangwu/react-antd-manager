import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './Admin';
// import App from './pages/route_demo/route1/Home';
// import App from './pages/route_demo/route2/router';
// import App from './pages/Basic/example'
// import App from './App'
import App from './router'


import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
