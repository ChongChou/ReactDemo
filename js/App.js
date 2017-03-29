/**
 * root组件
 * @author zhouchong
 * @date 03/28/17
 */
'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {
    View,
    NetInfo,
    AppState
} from 'react-native';
import TalentNavigator from './component/TalentNavigator'
import Utils from './common/Utils'
import CodePush from 'react-native-code-push';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    handleAppStateChange(appState) {
        if (appState === 'active') {
            CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
        }
    }

    render() {
        return (
            <TalentNavigator/>
        );
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});

        // 添加网络连接状态的监听事件
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        );

        NetInfo.isConnected.fetch().done(
            (isConnected) => { this._handleConnectivityChange(isConnected) }
        );
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);

        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        );
    }

    /**
     * 网络链接发生变化,
     * @param isConnected
     * @private
     */
    _handleConnectivityChange = (isConnected) => {
        Utils.isConnected = isConnected;
    };
}