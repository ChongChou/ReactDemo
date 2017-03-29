/**
 * Created by zhouchong on 2016/7/8.
 * 推荐/全部页面title bar
 */
'use strict';
import React from 'react';
import {
    Platform,
    Image,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';
import R from '../assets/Resource';
import Utils from '../common/Utils';

export default class CustomTitleBar extends React.Component {
    static propTypes:{
        // 导航器，用于控制back键
        navigator:Navigator;
        // 是否显示back按钮
        showBackButton:React.PropTypes.bool;
        // 标题栏文字
        titleText:React.PropTypes.string;
        // title bar右边部分Component
        rightView:React.PropTypes.object;
        //标题栏字体大小,这个属性不传值的话默认字体大小为20
        titleTextSize:React.PropTypes.number,
        // 左边的view
        leftView:React.PropTypes.object;
        // 返回按钮点击
        onBackClick:React.PropTypes.func;
    };


    render() {
        return (
            <View style={styles.root_container}>
                {Platform.OS === 'ios'?this._renderStatusBar():null}
                <View style={styles.content_container}>
                    {this.props.showBackButton ? this._renderBackButton() : (Utils.validateObject(this.props.leftView) ? this.props.leftView : null)}
                    <View style={styles.content_placement}/>
                    {Utils.validateObject(this.props.rightView) ? this.props.rightView : null}
                </View>
                <View style={styles.title_container}>
                    {this._renderTitleText()}
                </View>
            </View>
        );
    }

    /**
     * 绘制iOS的20像素的状态栏
     * @returns {XML}
     * @private
     */
    _renderStatusBar(){
        return(
            <View style={styles.ios_status_bar_view}/>
        );
    }

    /**
     * 绘制返回按钮
     * @returns {XML}
     * @private
     */
    _renderBackButton() {
        return (
            <TouchableHighlight
                onPress={this._back.bind(this)}
                underlayColor={R.color.title_bar_press}
                style={styles.back_button_container} >
                <Image source={R.drawable.title_bar_back} style={styles.back_button_image}/>
            </TouchableHighlight>
        );
    }

    /**
     * 绘制title text，不带箭头
     * @returns {XML}
     * @private
     */
    _renderTitleText() {
        let titleTextStyle = this.props.titleTextSize?[styles.title_text,{fontSize:this.props.titleTextSize}]:styles.title_text;
        return (
            <View style={styles.title_text_container}>
                <Text style={titleTextStyle} numberOfLines={1} lineBreakMode={'tail'}>{this.props.titleText}</Text>
            </View>
        );
    }

    /**
     * 返回页面
     * @private
     */
    _back() {
        this.props.onBackClick && this.props.onBackClick();
        this.props.navigator && this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    root_container:{
        flexDirection:'column',
        alignItems:'center',
        width:R.dimen.window_width,
        backgroundColor:R.color.title_bar_default,
        height:R.dimen.navigation_bar_height,
    },
    content_container:{
        flexDirection:'row',
        alignItems:'center',
        width:R.dimen.window_width,
        height:R.dimen.title_bar_height,
    },
    title_container:{
        width:R.dimen.window_width-150,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:R.dimen.title_bar_height,
        marginTop:-R.dimen.title_bar_height,
    },
    content_placement:{
        flex:1
    },
    back_button_container:{
        width:R.dimen.title_bar_back_size,
        height:R.dimen.title_bar_back_size,
        flexDirection:'row',
        alignSelf:'flex-start',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:R.color.transparent
    },
    back_button_image:{
        resizeMode:'cover'
    },
    title_text_container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    title_text:{
        textAlign: 'center',
        color:R.color.white,
        fontSize:R.dimen.title_bar_text_size,
        backgroundColor:R.color.transparent,
    },
    title_text_with_arrow_container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    ios_status_bar_view:{
        backgroundColor:R.color.title_bar_default,
        width:R.dimen.window_width,
        height:R.dimen.status_bar_height
    },
});