/**
 * 创建redux 状态store, 注册相关中间件
 * @author zhouchong
 * @date 03/28/17
 */
'use strict';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import array from './array';
import analytics from './analytics';
import RootReducers from '../reducers/RootReducer';
import {createLogger} from 'redux-logger';

//redux-persist用来将store对象存储到本地，以及从本地恢复数据到store中，比如说保存登录信息，下次打开应用可以直接跳过登录界面。
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';

/** 是否是在用chrome联调 **/
let isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

/** 注册redux-logger，打印出事件状态*/
let logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true
});

/**
 * 创建中间件
 */
let createAppStore = applyMiddleware(thunk, array, analytics, logger)(createStore);

function configureStore(onComplete: ?() => void) {
    const store = autoRehydrate()(createAppStore)(RootReducers);
    // 将store中的数据存储起来, 可设置白名单和黑名单, 设置了白名单则只会储存白名单中的数据, 设置了黑名单则除了黑名单中的数据其他的都会储存
    persistStore(store, {storage: AsyncStorage, whitelist: ['User']}, onComplete);
    if (isDebuggingInChrome) {
        window.store = store;
    }
    return store;
}

export default configureStore;
