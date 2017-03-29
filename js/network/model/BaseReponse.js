'use strict';

export default class BaseReponse {
    code:number;
    message:string;
    constructor(data) {
        Object.assign(this, data);
    }
}