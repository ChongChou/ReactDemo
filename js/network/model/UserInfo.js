'use strict';

import BaseResponse from './BaseReponse';

export default class UserInfoResponse extends BaseResponse {
    data:UserInfo;
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}

export type UserInfo = {
    id:string;              //用户id
    email:string;           //email
    name:string;            //用户名
    avatar:string;          //头像
};