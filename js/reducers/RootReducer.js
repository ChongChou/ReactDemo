/**
 * root组件
 * @author luqingyuan
 * @date 06/27/16
 */
'use strict';
import { combineReducers } from 'redux';
import User from './UserReducer';

let RootReducer = combineReducers({
    User,
});

export default RootReducer;
