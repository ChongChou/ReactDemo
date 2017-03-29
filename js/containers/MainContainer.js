'use strict';

import React from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import BaseContainer from './BaseContainer';
import R from '../assets/Resource';
import {connect} from 'react-redux';
import ToastManager from '../common/ToastManager';
import NavigatorHelper from '../common/NavigatorHelper';
import {Actions} from '../actions/index';

const BACK_CONFIRM_DURATION = 2000;

class MainContainer extends BaseContainer {

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={this._onButtonPress}>
                    <View>
                        <Text style={{fontSize:20}}>{this.props.isLoginIn?this.props.name + " is log in, click to logout":"To Login Page"}</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }

    _onButtonPress= ()=>{
        this.props.isLoginIn ?
            this.props.dispatch(Actions.logoutAction()) :
            this.props.navigator.push({
                name: NavigatorHelper.Constants.PAGE_LOGIN,
                props: {}
            });
    };

    /**
     * 重写_handleBack方法, 拦截back事件
     * @returns {boolean}   true: 页面内部处理back事件, false:执行默认的back事件
     * @private
     */
    _handleBack = ()=>{
        // 两次点击back间隔小于2000ms才执行退出
        let currentTime = new Date().getTime();
        if (this._pressBackTime !== -1 && currentTime - this._pressBackTime <= BACK_CONFIRM_DURATION) {
            return false;
        } else {
            this._pressBackTime = currentTime;
            ToastManager.showToast(R.string.toast_confirm_exit, ToastManager.durations.SHORT);
            return true;
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:R.color.white,
        alignItems:'center',
        justifyContent:'center'
    }
});

function select(store){
    return {
        id:store.User.userInfo.id,
        name:store.User.userInfo.name,
        isLoginIn:store.User.isLoginIn
    };
}

export default connect(select)(MainContainer);