'use strict';

import React from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import BaseContainer from './BaseContainer';
import {connect} from 'react-redux';
import LoginPage from '../pages/LoginPage';

class LoginContainer extends BaseContainer {
    render() {
        return <LoginPage {...this.props}/>;
    }
}

function select(store) {
    return {
        id:store.User.userInfo.id,
        isLoginIn:store.User.isLoginIn
    };
}

export default connect(select)(LoginContainer);