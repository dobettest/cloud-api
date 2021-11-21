var mongoose = require('mongoose');
var { Schema, model } = mongoose;
var joi = require('@hapi/joi');
const { nanoid } = require('nanoid');
var serviceSchema = new Schema({
    serviceID: String,
    serviceName: String,
    logo: String,//支持base64和url,
    author: String,
    phone: String,
    email: String,
    price: Number,
    dowmload_url: String,
    num: Number//下载量
})
var serviceValidator = joi.object({
    serviceID: joi.string().default(nanoid()),
    serviceName: joi.string().required(),
    phone: joi.string(),
    email: joi.string().email(),
    author: joi.string().default('未知'),
    logo: joi.string().default('cdn.dobettest.cn/img/plugin.svg'),
    price: joi.number().default(0),
    download_url: joi.string().required(),
    num: joi.number().default(0)
})
var serviceModel = model("service", serviceSchema);
module.exports = { serviceModel, serviceValidator };