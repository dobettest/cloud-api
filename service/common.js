var { createSingleon: createSmsClient } = require('tencent-sms/utils/sms');
var { createSingleon: createEmailClient } = require('node-email/utils/email');
var { drawCanvas } = require('../util/imgCode');
var redis = require('../lib/redis');
let smsConfig = {
    credential: {
        secretId: 'AKIDd4FBsKHgeP1PcaEkxyjETSCgusd8NxJQ',
        secretKey: '1nKhogIeldGdp69xXsypQ1Tm1YFk02qP'
    },
    region: "ap-guangzhou",
    profile: {
        httpProfile: {
            endpoint: "sms.tencentcloudapi.com",
        }
    }
}
let emailConfig = {
    service: 'qq',
    auth: {
        user: '1364525216@qq.com',
        pass: 'pmyjpdfhpymkjecb',
    }
}
class commonService {
    static redisClient = redis;
    constructor() {
        this.smsClient = createSmsClient(smsConfig);
        this.emailClient = createEmailClient(emailConfig);
    }
    static createSmsClient(config = smsConfig) {
        return createSmsClient(config);
    }
    static createEmailClient(config = emailConfig) {
        return createEmailClient(config);
    }
    static genImgCode() {
        return drawCanvas();
    }
}
module.exports = commonService;