'use strict';

import React from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput
} from 'react-native';
import R from '../assets/Resource';
import {Actions} from '../actions/index';
import ToastManager from '../common/ToastManager';
import {DialogTypes} from '../common/Constants';
import Utils from '../common/Utils';
import CustomTitleBar from '../component/CustomTitleBar';

const TAG = "LoginPage";
export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoginIn !== nextProps.isLoginIn && nextProps.isLoginIn) {
            this.props.navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomTitleBar
                    navigator={this.props.navigator}
                    titleText={"LoginPage"}
                    showBackButton={true}/>
                <View style={styles.content_wrapper}>
                    <TextInput style={styles.text_input}
                               placeholderTextColor={R.color.gray}
                               underlineColorAndroid="transparent"
                               placeholder="input your username"
                               onChangeText={(text) => this.setState({username:text})}/>
                    <TextInput style={styles.text_input}
                               placeholderTextColor={R.color.gray}
                               underlineColorAndroid="transparent"
                               placeholder="input your password"
                               onChangeText={(text) => this.setState({password:text})}/>
                    <TouchableWithoutFeedback onPress={this._handleLogin}>
                        <View style={styles.button_container}>
                            <Text style={styles.button_text}>Login</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    _handleLogin = ()=> {
        let username = this.state.username;
        let password = this.state.password;
        if (Utils.isEmpty(username) || Utils.isEmpty(password)) {
            ToastManager.showToast("用户名,密码不能为空", ToastManager.durations.SHORT);
            return;
        }
        this.context.showDialog({
            type:DialogTypes.TYPE_LOADING,
            autoDismiss:false
        });
        if (this.props.dispatch) {
            this.props.dispatch(Actions.loginAction(this.state.username, this.state.password,
                this._onLoginSuccess, this._onLoginFailed));
        }
    };

    _onLoginSuccess = ()=> {
        this.context.dismissDialog();
        ToastManager.showToast("Login Success~", ToastManager.durations.SHORT);
    };

    _onLoginFailed = ()=> {
        this.context.dismissDialog();
    };
}

LoginPage.contextTypes = {
    showDialog:React.PropTypes.func,
    dismissDialog:React.PropTypes.func
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:R.color.white
    },
    content_wrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    text_input:{
        height: 40,
        width:R.dimen.window_width-30,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom:15
    },
    button_container:{
        width:R.dimen.window_width-20,
        marginHorizontal:10,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00ff00'
    },
    button_text:{
        fontSize:20
    },
});