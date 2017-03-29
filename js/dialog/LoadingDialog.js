/**
 * 对话框基类
 * @author luqingyuan
 * @date 07/12/16
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Animated,
    Easing,
} from 'react-native';
import R from '../assets/Resource';
import Utils from '../common/Utils';

export default class LoadingDialog extends Component {

    static propTypes = {
        onDismiss:React.PropTypes.func,    //弹窗消失回调
    };

    constructor(props) {
        super(props);
        this.state = {
            spinnerRotate:new Animated.Value(0)
        }
    }

    render() {
        return (
            <View style = {styles.wrapper} >
                {this._renderLoadingView()}
            </View>
        );
    }

    _renderLoadingView() {
        return(
            <View style = {styles.container}>
                <Animated.Image style={{transform:[{
                        rotateZ: this.state.spinnerRotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                        })
                    }],width:50,height:50,resizeMode:'contain'}} source={R.drawable.ic_spinner}/>
            </View>
        );
    }

    /**
     * 开始loading动画
     * @private
     */
    _startLoadingAnim() {
        // 重置初始值
        this.state.spinnerRotate.setValue(0);
        if (!Utils.validateObject(this.loadAnim)) {
            // 给动画赋值
            this.loadAnim = Animated.timing(this.state.spinnerRotate, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            });
        }
        if (this.stopAnim !== true) {
            // 开始下一个动画
            this.loadAnim.start(this._startLoadingAnim.bind(this));
        } else {
            this.loadAnim.stop();
            this.stopAnim = false;
            if(Utils.validateFunction(this.stopCallback)) {
                this.stopCallback();
            }
        }
    }

    /**
     * 停止loading动画
     * @param endCallback
     */
    stopLoadingAnim(endCallback) {
        if(this.stopAnim) {
            if(Utils.validateFunction(endCallback)) {
                endCallback();
            }
        } else {
            this.stopAnim = true;
            this.stopCallback = endCallback;
        }
    }

    /**
     * 处理back事件点击
     * @returns {boolean}
     * @private
     */
    _handleBack = () => {
        return true;
    };

    componentDidMount() {
        this._startLoadingAnim();
        this.context.addBackButtonListener(this._handleBack);
    }

    componentWillUnmount() {
        this.context.removeBackButtonListener(this._handleBack);
        this.stopLoadingAnim();
        if(Utils.validateFunction(this.props.onDismiss)) {
            this.props.onDismiss();
        }
    }
}

LoadingDialog.contextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
};

const styles = StyleSheet.create({
    wrapper :{
        flex:1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width:75,
        height:75,
        backgroundColor: R.color.color_half_transparent,
        borderWidth: 0,
        borderColor: R.color.color_half_transparent,
        borderRadius: 8,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
