/**
 * container基类，处理back事件
 * @author zhouchong
 * @date 03/28/17
 */

import React from 'react';

'use strict';
export default class BaseContainer extends React.Component {

    /**
     * 子类可以重写此方法拦截back事件
     * @returns {boolean}
     * @private
     */
    _handleBack = () => {
        this.props.navigator.pop();
        return true;
    };

    componentDidMount() {
        this.props.navigator.addBackButtonListener(this._handleBack);
    }

    componentWillUnmount() {
       this.props.navigator.removeBackButtonListener(this._handleBack);
    }
}