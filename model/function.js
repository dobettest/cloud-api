var joi = require('@hapi/joi');
var triggerValidator = joi.object({
    // name: 触发器的名字
    name: joi.string().required(),
    // type: 触发器类型，目前仅支持 timer （即定时触发器）
    type: joi.string().valid("timer"),
    // config: 触发器配置，在定时触发器下，config 格式为 cron 表达式
    config: "0 0 2 1 * * *"
})
var layerValidator = joi.object({
    version: joi.number().required(),
    name: joi.string().required()
})
var vpcValidator = joi.object({
    vpcId: joi.string().required(),
    subnetId: joi.string().required()
})
var ICloudFunctionValidator = joi.object({
    name: joi.string().required(),
    timeout: joi.number().default(5),
    vpc: vpcValidator,
    // 环境变量
    envVariables: joi.object(),
    runtime: joi.string().default("Nodejs10.15"),
    // 函数触发器，说明见文档: https://cloud.tencent.com/document/product/876/32314
    triggers: joi.array().items(triggerValidator),
    layers: joi.array().items(triggerValidator)
})
var functionValidator = joi.object({
    func: ICloudFunctionValidator,
    functionRootPath: joi.string().default(""),
    force: joi.boolean().default(true),
    base64Code: joi.string().base64().required()
})
module.exports={ functionValidator, triggerValidator, layerValidator, vpcValidator }