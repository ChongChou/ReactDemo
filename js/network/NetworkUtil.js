/**
 * Fetch简单封装
 * @author zhouchong
 * @date 03/28/17
 */

'use strict';
import Utils from '../common/Utils';

const TAG = 'talent_network';
export const NetworkUtil = {
    /**
     * 错误码
     */
     ErrorCode : {

    },

    /**
     * 默认超时时间
     */
    DEFAULT_TIMEOUT: 10000,

    /**
     * get请求
     * @param url  请求连接
     * @param successCallback  请求成功回调
     * @param failCallback 请求失败回调
     * @param timeout 超时时间,单位:ms, 默认为DEFAULT_TIMEOUT
     * @param headerExtras 额外携带的header参数
     */
    get: (url, successCallback, failCallback,timeout=NetworkUtil.DEFAULT_TIMEOUT, headerExtras=null) => {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
            //'userExtra': Utils.getHeaderUserExtra(),
            //'token': Utils.getHeaderToken()
        };
        // 添加额外的Header字段
        if (Utils.validateObject(headerExtras)) {
            headers = Object.assign({}, headers, headerExtras);
        }

        var fetchOptions = {
            method: 'GET',
            headers: headers
        };
        NetworkUtil._doFetch(url,fetchOptions, successCallback, failCallback, timeout);
    },

    /**
     * get请求，可设置header，不会携带公有的header参数
     * @param url
     * @param headers
     * @param successCallback
     * @param failCallback
     */
    getWithHeader: (url, headers, successCallback, failCallback)=>{
        let fetchOptions = {
            method:'GET',
            headers:Object.assign({}, headers)
        };
        NetworkUtil._doFetch(url, fetchOptions, successCallback, failCallback, NetworkUtil.DEFAULT_TIMEOUT);
    },

    /**
     * delete请求
     * @param url  请求连接
     * @param successCallback  请求成功回调
     * @param failCallback 请求失败回调
     * @param timeout 超时时间
     */
    delete: (url, successCallback, failCallback,timeout=NetworkUtil.DEFAULT_TIMEOUT) => {
        var fetchOptions = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                //'userExtra': Utils.getHeaderUserExtra(),
                //'token': Utils.getHeaderToken()
            }
        };
        NetworkUtil._doFetch(url,fetchOptions, successCallback, failCallback, timeout);
    },

    /**
     * put请求，content-type为json
     * @param url  请求连接
     * @param data  body传输数据
     * @param successCallback  请求成功回调
     * @param failCallback 请求失败回调
     * @param timeout 超时时间
     */
    putJson: (url, data, successCallback, failCallback,timeout=NetworkUtil.DEFAULT_TIMEOUT) => {
        var fetchOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'userExtra': Utils.getHeaderUserExtra(),
                //'token': Utils.getHeaderToken()
            },
            body:JSON.stringify(data)
        };
        NetworkUtil._doFetch(url,fetchOptions, successCallback, failCallback, timeout);
    },

    /**
     * post请求，content-type为form
     * @param url  请求连接
     * @param data  body传输数据
     * @param successCallback  请求成功回调
     * @param failCallback 请求失败回调
     * @param timeout 超时时间
     */
    postForm: (url, data, successCallback, failCallback,timeout=NetworkUtil.DEFAULT_TIMEOUT) => {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                //'userExtra': Utils.getHeaderUserExtra(),
                //'token': Utils.getHeaderToken()
            },
            body:'data='+data
        };

        NetworkUtil._doFetch(url,fetchOptions, successCallback, failCallback, timeout);
    },

    /**
     * post请求，content-type为json
     * @param url  请求连接
     * @param data  body传输数据
     * @param successCallback  请求成功回调
     * @param failCallback 请求失败回调
     * @param timeout 超时时间
     */
    postJson: (url, data, successCallback, failCallback, timeout=NetworkUtil.DEFAULT_TIMEOUT) => {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'userExtra': Utils.getHeaderUserExtra(),
                //'token': Utils.getHeaderToken()
            },
            body: JSON.stringify(data)
        };
        NetworkUtil._doFetch(url,fetchOptions, successCallback, failCallback, timeout);
    },

    /**
     * 执行fetch请求
     * @param url 请求url地址
     * @param fetchOptions  请求参数
     * @param successCallback  成功回调
     * @param failCallback  失败回调
     * @param timeout  超时时间
     * @private
     */
    _doFetch(url, fetchOptions, successCallback, failCallback, timeout) {
        Utils.log(TAG+': url = '+ url + ', options = ' +fetchOptions+',timeout = ' +timeout);
        timeout(timeout, fetch(url, fetchOptions))
            .then((response) => response.text())
            .catch((err) => {
                Utils.log(TAG + ': url = ' + url + ', ERROR: ' + err.message);
                failCallback(err);
            })
            .then((responseText) => {
                    Utils.log(TAG + ': url = ' + url + ' RESPONSE: ' + responseText);
                    let result = null;
                    try {
                        result = JSON.parse(responseText);
                    } catch (err){
                        failCallback(err);
                    }
                    if(Utils.validateObject(result)) {
                        successCallback(result);
                    }
            });
    },

    /**
     * 给url拼接参数
     * @param url   请求的基础url
     * @param params    参数列表，形式为{key:string,value:string}对象的集合
     * @returns {string}    最终生成的请求url
     */
    buildUrl(url:string,params:[{key:string,value:string}]):string{
        let baseUrl = url+"?";
        params.forEach((param)=>{
            if (typeof (param.value) == 'undefined' || param.value == null || param.value.length <= 0) {
            } else {
                baseUrl = baseUrl + param.key+"="+param.value+"&";
            }
        });
        let resultUrl = baseUrl.substring(0, baseUrl.length-1);
        Utils.log("buildUrl,resultUrl = " + resultUrl);
        return resultUrl;
    },

    timeout(time, promise) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                reject(new Error("timeout"))
            }, time);
            promise.then(resolve, reject)
        }
        )
    },
};