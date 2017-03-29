/**
 * dialog container  用该管理所有dialog显示
 * @author zhouchong
 * @date 03/28/17
 */
'use strict';
import React from 'react';
import LoadingDialog from '../dialog/LoadingDialog';

import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import R from '../assets/Resource';
import {DialogTypes} from '../common/Constants';

export default class DialogContainer extends React.Component {
    //该组件所有的props，state都需要列出来以便维护
    static propTypes:{
        navigator: Navigator;
        type:React.propTypes.number.isRequired;  //对话框类型
        autoDismiss:React.propTypes.boolean;  //是否点击空白区域消失
        backgroundStyle:React.propTypes.any;   //背景样式
    };

    render() {
        let containerStyle;
        if (this.props.backgroundStyle !== undefined) {
            containerStyle = [styles.container, this.props.backgroundStyle];
        } else {
            containerStyle = [styles.container, {backgroundColor: R.color.color_half_transparent}];
        }

        return (
            <TouchableWithoutFeedback onPress={this._handleBgViewClick}>
                <View style={containerStyle}>
                    {this._renderDialogContent()}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _renderDialogContent = () => {
        //根据类型渲染对应的对话框
        switch (this.props.type) {
            case DialogTypes.TYPE_LOADING:
                return (<LoadingDialog {...this.props}/>);
        }
    };

    _handleBgViewClick = () => {
        if (this.props.autoDismiss === undefined || this.props.autoDismiss === true) {
            this.props.dismissDialog();
        }
    };

    shouldComponentUpdate() {
        return true;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
});
