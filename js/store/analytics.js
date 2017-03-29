/**
 * redux中间件，用来打印定制的log
 * @author zhouchong
 * @date 03/28/17
 */
'use strict';
import Utils from '../common/Utils';

const analytics = store => next => action => {
    if (typeof action === 'function') {
        Utils.log('dispatching a function');
    } else {
        Utils.log('dispatching', action);
    }
    let result = next(action);
    Utils.log('next state', store.getState());
    return result;
};

export default analytics;