'use strict';
import {ActionConstants} from './index';
import {UserInfo} from '../network/model/UserInfo';

/**
 * 用户登录action
 * @param username
 * @param password
 * @param onSuccess
 * @param onFailed
 * @returns {Function}
 */
export let loginAction = (username, password, onSuccess, onFailed)=>{
    return dispatch=> {
        // do login action
        let userInfo = {
            id:'UserId',
            email:'UserEmail',
            name:username,
            avatar:'UserAvatar'
        };
        // 根据登录结果, 分发不同的action参数
        dispatch(_loginAction(userInfo, true));
        onSuccess && onSuccess();
    };
};

let _loginAction= (userInfo:UserInfo, success:boolean)=>{
    return {
        type:ActionConstants.ACTION_LOGIN,
        success:success,
        userInfo:userInfo
    };
};

/**
 * 用户登出action
 * @returns {Function}
 */
export let logoutAction = ()=>{
    return dispatch=>{
        dispatch(_logoutAction());
    };
};

let _logoutAction= ()=>{
  return {
      type:ActionConstants.ACTION_LOGOUT
  };
};