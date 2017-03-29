'use strict';
import {
    Dimensions,
    Platform,
    PixelRatio
} from 'react-native';

const window = Dimensions.get('window');

export let dimen = {
    // 屏幕的宽高
    window_width:window.width,
    window_height:window.height,
    // 手机上的StatusBar的高度,ios上为20,android上为0
    status_bar_height:Platform.OS==='ios'?20:0,

    navigation_bar_height:Platform.OS === 'ios'?64:53,
    title_bar_height:Platform.OS === 'ios'?44:53,
    title_bar_back_size:Platform.OS === 'ios'?44:53,
    title_bar_text_size:20,
};