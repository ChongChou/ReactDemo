/**
 * 把需要通过Navigator跳转的页面配置如下
 *
 * Created by luqingyuan on 2016/7/4.
 */
'use strict';
import React from 'react';

/** 工具类 */
import Utils from '../common/Utils';
//import {StorageHelper} from '../common/StorageHelper';
import {Actions} from '../actions/index';

/** 主界面 */
import MainContainer from '../containers/MainContainer';
import LoginContainer from '../containers/LoginContainer';

export default class NavigatorHelper {
    // 定义要跳转的页面Tag，使用的时候直接使用tag跳转，不调用具体的页面
    static Constants = {
        /** 主界面 */
        PAGE_MAIN_CONTAINER: 'MainContainer',
        /** 登录页面 */
        PAGE_LOGIN:'LoginContainer',
    };

    /**
     * 获取要跳转的页面
     * @param pageName NavigatorHelper定义的页面名称
     * @param navigator LeoNavigator传递过来的
     * @param props LeoNavigator传递过来的
     */
    static getSwitchPage(pageName, navigator, props) {
        if (pageName === NavigatorHelper.Constants.PAGE_MAIN_CONTAINER) {
            return (<MainContainer navigator = {navigator} {...props} />);
        } else if (pageName === NavigatorHelper.Constants.PAGE_LOGIN) {
            return (<LoginContainer navigator={navigator} {...props}/>);
        }
    }

    /**
     * 获取初始路由
     * @return {{name: string, props: {}}}
     */
    static getInitialRoute() {
        let pageName = NavigatorHelper.Constants.PAGE_MAIN_CONTAINER;
        //let showGuidePage = this._ifShowGuidePage();
        //if (showGuidePage === true) {
        //    pageName = NavigatorHelper.Constants.PAGE_GUIDE;
        //}
        return {name: pageName, props: {}};
    }

    /**
     * 检查是否需要显示引导页
     * @private
     */
    //static _ifShowGuidePage() {
    //    let nativeConstants = StorageHelper.getNativeConstants();
    //    if (nativeConstants && nativeConstants.showGuidePage !== false) {
    //        StorageHelper.saveNativeConstants({showGuidePage:false});
    //        return true;
    //    } else {
    //        return false;
    //    }
    //}

    /**
     * 从navigator中获取当前栈顶的页面name
     * @param navigator
     * @return {string}
     */
    static getCurrentPageName(navigator:Navigator):string {
        let name = '';
        if (Utils.validateObject(navigator)) {
            let routes = navigator.getCurrentRoutes();
            if (Utils.validateObject(routes) && routes.length>0) {
                name = routes[routes.length-1].name;
            }
        }
        return name;
    }

    /**
     * 根据参数param跳转到应用内的页面, 目前支持webview、facebook分享跳转
     * @param dispatch  redux dispatch
     * @param navigator 导航器,控制页面切换
     * @param isLogIn   用户是否已登录, 某些页面需要登录后才能进入
     * @param param     跳转参数,格式为{name:string, props:{}}
     */
    //static gotoPageWithParam(dispatch, navigator, isLogIn, param) {
    //    if (Utils.validateObject(param) && !Utils.isEmpty(param.name)) {
    //        if (NavigatorHelper.Constants.PAGE_MAIN_CONTAINER === param.name) { // 跳转到首页
    //            dispatch(Actions.switchPageAction(
    //                navigator,
    //                NavigatorHelper.Constants.PAGE_MAIN_CONTAINER,
    //                {tab: MainContainerTabTag.PAGE_RECOMMEND}));
    //        } else if (param.name !== NavigatorHelper.getCurrentPageName(navigator)) {
    //            if (!isLogIn && NavigatorHelper._isPageNeedLogin(param.name)) {    //未登录且非跳转到商品详情页面,则先到登录页面
    //                navigator.push({
    //                    name: NavigatorHelper.Constants.PAGE_LOGIN,
    //                    props: {nextPageData: param}
    //                });
    //            } else {
    //                navigator.push(param);
    //            }
    //        }
    //    }
    //}

    /**
     * 判断外部跳转到制定的page需不需要登录, 不需要登录的页面白名单在此处添加
     * @private
     */
    //static _isPageNeedLogin(pageName:string) {
    //    let notNeedLoginPages = [
    //        NavigatorHelper.Constants.PAGE_PRODUCT_DETAIL,  // 商品详情页
    //        NavigatorHelper.Constants.PAGE_ALL_CONTAINER,   // 全部页
    //        NavigatorHelper.Constants.PAGE_VERSUS_PRODUCT,  // Versus商品详情页
    //        NavigatorHelper.Constants.PAGE_VS,              // Versus列表页
    //    ];
    //    return notNeedLoginPages.indexOf(pageName) === -1;
    //}

}

