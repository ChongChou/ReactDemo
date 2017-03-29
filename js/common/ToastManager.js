/**
 * 提供通用的toast管理类，屏蔽具体的实现
 * Created by wangchong on 2016/7/19.
 */
import Toast from 'react-native-root-toast';
import R from '../assets/Resource';

export default class ToastManager {
    // Toast持续时间
    static durations = {
        SHORT: 2000,
        LONG: 3500
    };

    static positions = {
        TOP: R.dimen.window_height/4,
        BOTTOM: -R.dimen.window_height/5,
        CENTER: 0
    };

    static showToast(message: String, duration: number, position: number) {
        let actualDuration = Toast.durations.SHORT;
        if (duration === ToastManager.durations.LONG) {
            actualDuration = Toast.durations.LONG;
        }

        let toastPosition = ToastManager.positions.BOTTOM;
        if (position !== undefined && position !== null) {
            toastPosition = position;
        }

        Toast.show(message, {
            duration: actualDuration,           // 显示时长
            position: toastPosition,            // 显示位置(BOTTOM = -20, CENTER = 0, TOP = 20)
            shadow: false,                       // 是否出现阴影
            animation: true,                    // 显示/隐藏的时候是否需要使用动画过渡
            hideOnPress: false,                  // 是否可以通过点击事件对toast进行隐藏
            delay: 0,                           // 显示的延迟时间
            backgroundColor: R.color.toast_background_color,
            textColor: R.color.white,
            onShow: () => {
                // toast出现回调（动画开始时）
            },
            onShown: () => {
                // toast出现回调（动画结束时）
            },
            onHide: () => {
                // toast隐藏回调（动画开始时）
            }
        });
    }
}


