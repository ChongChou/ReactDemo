/**
 * Created by zhouchong on 2017/3/28.
 */

'use strict';
import {
    Dimensions,
    Platform
} from 'react-native';
import {Constants} from '../common/Constants';

export default class Utils {
    /**
     * 网络是否连接上
     * @type {boolean}
     */
    static isConnected = true;

    /**
     * 时间戳转为标准的时间
     * @param time
     * @returns {string} 2016-7-11 16:44
     * @private
     */
    static getDate(time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        return year + "-" + Utils._getXX(month) + "-" + Utils._getXX(day) + " " + Utils._getXX(hour) + ":" + Utils._getXX(minute);
    }

    /**
     * 获取用斜线分割的时间格式字符串
     */
    static getSlashDate(time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        return Utils._getXX(month) + "/" + Utils._getXX(day) + "/" + year + " " + Utils._getXX(hour) + ":" + Utils._getXX(minute);
    }

    /**
     * 时间戳转为 时:分:秒:毫秒
     * @param time
     * @returns {string} 16:44:66:999
     * @private
     */
    static getTime(time) {
        let date = new Date(time);
        let hour = Utils._getXX(date.getHours());
        let minute = Utils._getXX(date.getMinutes());
        let second = Utils._getXX(date.getSeconds());
        let millisecond = Utils._getMilliseconds(date.getMilliseconds());
        return hour + ":" + minute + ":" + second + ":" + millisecond;
    }

    /**
     * 时间戳转为 年-月-日
     * @param time
     * @returns {string} 2016-7-11
     * @private
     */
    static getYTD(time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = Utils._getXX(date.getMonth() + 1);
        let day = Utils._getXX(date.getDate());
        return year + "-" + month + "-" + day;
    }

    /** 格式化时间数值为：XX */
    static _getXX = (time) => {
        return (time < 10 ? '0' : '') + time;
    };

    /** 格式化毫秒数为：XXX */
    static  _getMilliseconds = (millisecond) => {
        if (parseInt(millisecond) < 10) {
            return '00' + millisecond;
        } else if (parseInt(millisecond) < 100) {
            return '0' + millisecond;
        } else {
            return millisecond
        }
    };

    /** 去除字符串前后空格 */
    static trim(str) {
        if (Utils.isEmpty(str)) {
            return "";
        }
        str = str.replace(/^(\s|\u00A0)+/, '');
        for (var i = str.length - 1; i >= 0; i--) {
            if (/\S/.test(str.charAt(i))) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return str;
    }

    /**
     * 获取屏幕宽高
     */
    static getDeviceScreenSize() {
        let window = Dimensions.get('window');
        return ({
            w: window.width,
            h: window.height
        });
    }

    /**
     * 验证对象是否可用，若为'undefine' null 返回false，否则返回true
     */
    static validateObject(paramObject):boolean {
        let type = typeof(paramObject);
        return type === 'object' && paramObject !== null;
    }

    /**
     * 验证function对象是否可用
     * @param paramFunction
     * @returns {boolean}
     */
    static validateFunction(paramFunction):boolean {
        let type = typeof (paramFunction);
        return type === 'function' && paramFunction !== null;
    }

    /**
     * 判断字符串是否为空
     * @param paramString
     * @returns {boolean}
     */
    static isEmpty(paramString:string):boolean {
        let result = true;
        if (typeof paramString === 'string' && paramString !== null) {
            result = paramString.trim().length <= 0;
        }
        return result;
    }

    /**
     * 格式化字符串，比如：
     * 1）stringFormat("{0},{1},hehe", ["hello","world"])，格式化为hello,world,hehe
     * 2）stringFormat("{0},world,hehe", ["hello"])，格式化为hello,world,hehe
     * @param source 要格式化的字符串，要替换的参数用{}包含
     * @param args 用来替换的参数
     * @returns 格式化完成后的字符串
     */
    static stringFormat(source, args) {
        return source.replace(/\{([^}]+)\}/g, function (str, key) {
            return (args[key] + '') || str;
        });
        return source;
    }

    /**
     * 打印在控制台的Log信息，release版本需要关闭
     * @param message
     */
    static log(message) {
        if (Constants.LOG_ENABLE) {
            console.log(message);
        }
    }

    /**
     * 
     * @returns {boolean}
     */
    static isAndroidPlatform() {
        if (Platform.OS === 'android') {
            return true;
        } else {
            return false;
        }
    }
}