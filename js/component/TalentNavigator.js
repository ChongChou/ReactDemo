/**
 * 处理页面间跳转逻辑
 * @author zhouchong
 * @date 03/28/17
 */
import React from 'react';
import {connect} from 'react-redux';
import Platform from 'Platform'
import NavigatorHelper from './../common/NavigatorHelper'
/** 通用dialog */
import DialogContainer from '../containers/DialogContainer'
import {
    BackAndroid,
    Navigator,
    StyleSheet,
    View,
} from 'react-native';
import Utils from './../common/Utils';

export default class TalentNavigator extends React.Component {
    /**
     * 构造函数，所有属性都需要在此定义
     */
    constructor(props) {
        super(props);
        //定义一个数组，管理事件监听，
        //检查输入参数必须是函数
        this._handlers = ([]: Array<() => boolean>);
        this.state = {
            showDialog:false,
            dialogProps:{}
        }
    }

    componentDidMount() {
        //仅android平台处理back事件
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton);
        }
    }

    componentWillUnmount() {
        //仅android平台处理back事件
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton);
        }
    }

    /**
     * override父组件方法, 用于向context中注入back事件监听函数，其他组件在{TalentNavigator.childContextTypes}中声明回调后，
     * 可以通过{this.context.XXX}调用
     * @returns {{addBackButtonListener: TalentNavigator.addBackButtonListener, removeBackButtonListener: TalentNavigator.removeBackButtonListener}}
     */
    getChildContext() {
        return {
            addBackButtonListener: this.addBackButtonListener,
            removeBackButtonListener: this.removeBackButtonListener,
            showDialog:this.showDialog,
            dismissDialog:this.dismissDialog
        };
    }

    /**
     * 注册back事件监听,每个需要监听back事件的页面都需要注册
     * 必须使用函数变量，否则函数内获取的this不对
     * @param listener
     * @private
     */
    addBackButtonListener = (listener) => {
        if (Platform.OS === 'android') {
            this._handlers.push(listener);
        }
    };

    /**
     * 注销back事件监听,必须使用函数变量，否则函数内获取的this不对
     * @param listener
     * @private
     */
    removeBackButtonListener = (listener) => {
        if (Platform.OS === 'android') {
            this._handlers = this._handlers.filter((handler) => handler !== listener);
        }
    };

    /**
     * 处理back事件, 注册回调时，必须使用函数变量，否则函数内获取的this不对
     * @returns {boolean}
     * @private
     */
    _handleBackButton = () => {
        //处理事件监听
        if (this._handlers !== undefined) {
            for (let i = this._handlers.length - 1; i >= 0; i--) {
                if (this._handlers[i]()) {
                    return true;
                }
            }
        }

        //没有事件监听，如果路由里有页面，则直接指定pop
        var navigator = this._navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }

        return false;
    };

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    ref={(ref) => {if(this._navigator===undefined) {this._navigator = ref;}}}         //将navigator引用保存到this中，可以通过this->_navigator调用
                    style={styles.container}
                    configureScene={(route) => {
                        if (Platform.OS === 'android') {
                             return Navigator.SceneConfigs.FloatFromBottomAndroid;
                        }
                        //定制界面跳转动画
                        if (route.name === NavigatorHelper.Constants.PAGE_MAIN_CONTAINER) {
                            return Navigator.SceneConfigs.FloatFromRight;
                        } else {
                           //默认页面切换动画
                            return Navigator.SceneConfigs.FloatFromRight;
                        }
                   }}
                    initialRoute={NavigatorHelper.getInitialRoute()}
                    renderScene={this._renderScene}
                />
                {this._renderDialog()}
            </View>
        );
    }

    _renderScene = (route, navigator) => {
        Utils.log('navigator route = ' + route.name + ", props = " +
            (route.props ? route.props.toString() : "null"));
        //根据传入的参数，跳转到指定页面
        return NavigatorHelper.getSwitchPage(route.name, this, {...route.props});
    };

    /**
     * 绘制对话框
     * @returns {*}
     * @private
     */
    _renderDialog = () => {
        if(this.state.showDialog) {
            return  <DialogContainer navigator = {this} {...this.state.dialogProps}
                                     dismissDialog = {this.dismissDialog.bind(this)}/>;
        }
    };

    getCurrentRoutes() {
        return this._navigator.getCurrentRoutes();
    }

    push(props) {
        if(Utils.validateObject(props)) {
            this._navigator.push(props);
        }
    }

    pop() {
        this._navigator.pop();
    }

    replace(props) {
        if(Utils.validateObject(props)) {
            this._navigator.replace(props);
        }
    }

    popToRoute(props) {
        if(Utils.validateObject(props)) {
            this._navigator.popToRoute(props);
        }
    }

    /**
     * 用pushProps替换指定路由index的页面,并pop到新页面
     * @param index
     * @param pushProps
     */
    popToIndexWithPush(index, pushProps) {
        if(Utils.validateObject(pushProps)) {
            this._navigator.replaceAtIndex(pushProps, index, () =>{
                this._navigator.popToRoute(pushProps);
            });
        }
    }

    popToTop() {
        this._navigator.popToTop();
    }

    /**
     * 显示对话框
     * @param props 见DialogContainer
     * @private
     */
    showDialog = (props) =>{
        this.setState({
            showDialog:true,
            dialogProps:props
        });
    };

    /**
     * 隐藏对话框
     * @private
     */
    dismissDialog = () => {
        this.setState({
            showDialog:false,
            dialogProps:{}
        });
    }
}

/**
 * 向context中注入back事件监听listener管理回调，供其他组件调用，
 * 注册的组件和使用的组件中都必须声明，不然无法正常使用
 * @type {{addBackButtonListener: *, removeBackButtonListener: *}}
 */
TalentNavigator.childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
    showDialog:React.PropTypes.func,
    dismissDialog:React.PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});