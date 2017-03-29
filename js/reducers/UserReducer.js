'use strict';

import {ActionConstants} from '../actions/index';

const initialState = {
    userInfo:{},
    isLoginIn:false
};

const UserReducer = (state = initialState, action)=> {
    switch (action.type) {
        case ActionConstants.ACTION_LOGIN:
            return Object.assign({}, state, {
                userInfo:action.userInfo,
                isLoginIn:action.success
            });
        case ActionConstants.ACTION_LOGOUT:
            return Object.assign({}, state, {
                userInfo:{},
                isLoginIn:false
            });
        default:
            return state;
    }
};

export default UserReducer;