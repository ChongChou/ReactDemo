'use strict';
import {loginAction, logoutAction} from './UserAction';

export let ActionConstants = {
    ACTION_LOGIN:'ACTION_LOGIN',
    ACTION_LOGOUT:'ACTION_LOGOUT'
};

export let Actions = {
    loginAction,logoutAction,
};