'use strict';

import {NativeModules} from 'react-native';
import Utils from '../common/Utils';

export default class NativeUtils {
    /**
     * 以键值对的形式存储String, 调用native的SharedPreferences
     * @param key
     * @param value
     */
    static saveString(key, value) {
        if (typeof value === "string") {
            NativeModules.SharedPreferences.saveString(key, value);
        }
    }

    /**
     * 获取saveString存储的数据,调用native的SharedPreferences
     * @param key
     * @param defaultValue
     * @param callback
     */
    static getString(key, defaultValue, callback) {
        if (typeof  defaultValue === "string") {
            NativeModules.SharedPreferences.getString(key, defaultValue, callback);
        }
    }

    /**
     * 获取本地变量,返回一个obj对象
     * @returns {{}}
     */
    static getNativeConstants() {
        let nativeConstants = {};
        try {
            nativeConstants = JSON.parse(NativeModules.SharedPreferences.NativeConstants);
        } catch (err) {
            Utils.log(err);
        }
        return nativeConstants;
    }

    /**
     * 设置本地变量, 存储一个对象, 如:{showGuidePage:false}, 则会将NativeConstants中的showGuidePage置为false
     * @param obj
     */
    static saveNativeConstants(obj) {
        if (obj !== undefined) {
            let sourceObj = this.getNativeConstants();
            let valueObj = Object.assign(sourceObj, obj);
            let valueJson = JSON.stringify(valueObj);
            this.saveString("NativeConstants", valueJson);
            NativeModules.SharedPreferences.NativeConstants = valueJson;
        }
    }

    /**
     * 清除SharedPreferences中存储的数据
     */
    static clearData() {
        NativeModules.SharedPreferences.clear();
    }
}