var mongoose = require('mongoose')
var { Schema, model } = mongoose;
var joi = require('@hapi/joi')
var companySchema = new Schema({
    companyID:String,
    companyName: String,
    timID: Number,//tim sdkid
    private_key_id: String,//cloudbase key_key_id
    private_key: String,//cloudbase key
    envID: String,
    phone: String,
    email: String,
    location: String,//国家,省份,城市,区县,
    registerTime: Date,//注册时间
    rest: Number//账户余额
})
var companyValidator = joi.object({
    companyID:joi.string().required(),
    companyName: joi.string().required(),
    timID: joi.number().default(1400586279),//tim sdkid
    private_key_id: joi.string().required(),//cloudbase key_key_id
    private_key: joi.string().required(),//cloudbase key
    envID: joi.string().required(),
    phone: joi.string(),
    email: joi.string().email(),
    location: joi.string().default('中国-广东-广州'),//国家,省份,城市,区县,
    registerTime: joi.date().default(Date.now()),//注册时间
    rest: joi.number().default(0)//账户余额
})
var companyModel = model("company", companySchema);
module.exports = { companyModel, companyValidator };