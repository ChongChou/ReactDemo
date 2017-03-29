/**
 * 存储key-value数据
 * Created by wangchong on 2016/7/29.
 */
'use strict';
import Storage from 'react-native-storage';
import {
    AsyncStorage
} from 'react-native';
import Utils from '../common/Utils';
import {NativeUtils} from '../native/NativeUtils';

const storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,
});

// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用

// 对于web
// window.storage = storage;

// 对于react native
// global.storage = storage;

// 这样在之后的任意位置即可以直接调用storage

export const StorageHelper = {
    /**
     * 所有存储的Key值，key/value不能包含_下划线
     */
    KEYS : {
        KEY_POP_UPDATE_DIALOG_TIME : "popUpdateDialogTime",          // 记录上次弹出升级对话框的时间
        KEY_SHOW_GUIDE_PAGE: "showGuidePage",                        // 记录是否要显示引导页
        KEY_SHOW_CHECK_IN_TIP: "showCheckInTip",                     // 记录是否要显示签到对话框
        KEY_SHOW_VS_TIP: "showVsTip",                                // 记录是否要显示VS的小红点
        KEY_SHOW_FIRST_RECHARGE_TIP: "showFirstRechargeTip",         // 记录是否要显示首充的小红点
    },

    /**
     * 存储数据
     * @param key 存储的Key
     * @param value 对应的Value
     */
    saveValue: (key, value) => {
        storage.save({
            key: key,
            rawData: {
                value: value
            },

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
    },

    /**
     * 获取数据
     * @param key 数据对应的Key
     * @param defaultValue 默认值
     * @param callback 获取到的值通过callback异步返回
     */
    getValue: (key, defaultValue, callback) => {
        storage.load({
            key: key,

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: false,
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            if (Utils.validateFunction(callback)) {
                callback(ret.value);
            }
        }).catch(err => {
            // 如果没有找到数据且没有同步方法，
            // 或者有其他异常，则在catch中返回
            if (Utils.validateFunction(callback)) {
                callback(defaultValue);
            }
        });
    },

    /**
     * 将value存放到native中,只能存放string类型的value, 对于android:存放在sp中. 对于ios:存放在UserDefaultSettings中
     * @param key
     * @param value
     */
    saveNativeValue: (key, value)=>{
        NativeUtils.saveString(key, value);
    },

    /**
     * 获取native中存储的value值,string类型
     * @param key
     * @param defaultValue
     * @param callback
     */
    getNativeValue: (key, defaultValue, callback)=>{
        NativeUtils.getString(key, defaultValue, callback);
    },

    /**
     * 清除native中存储的键值对
     */
    clearNativeValue: ()=>{
        NativeUtils.clearData();
    },

    /**
     * 获取NativeConstants,返回一个obj类型的对象
     * @returns {{}}
     */
    getNativeConstants: ()=>{
        return NativeUtils.getNativeConstants();
    },

    /**
     * 将一个obj类型的对象存放到NativeConstants中
     * @param obj
     */
    saveNativeConstants: (obj)=>{
        NativeUtils.saveNativeConstants(obj);
    },
};
