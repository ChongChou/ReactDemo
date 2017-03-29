/**
 * root组件
 * @author zhouchong
 * @date 03/28/17
 */
'use strict';
import React from 'react'
import {Provider} from 'react-redux'
import configureStore from './store/store'
import Utils from './common/Utils'

import App from './App'

export default class Root extends React.Component {
    constructor(){
        super();
        this.state = {
            store: configureStore(()=>{})
        }
    }

    render() {
        return (
            <Provider store = {this.state.store} >
                <App />
            </Provider>
        )
    }
}
