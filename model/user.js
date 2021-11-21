var mongoose = require('mongoose');
var { Schema, model } = mongoose;
var joi = require('@hapi/joi');
// var { v4: uuidV4 } = require('uuid');
const { nanoid } = require('nanoid');
var userSchema = new Schema({
    userID: String,
    userName: String,
    avatar: String,
    password: String,
    phone: String,
    email: String,
    gender: String,
    location: String,//国家,省份,城市,区县, 
    roles: Array,
    birthday: String,
    rest: Number//余额
})
var userValidator = joi.object({
    userID: joi.string().trim().default(nanoid()),
    userName: joi.string().default('默认用户'),
    password: joi.string().default('123456'),
    avatar: joi.string().default("https://cdn.dobettest.cn/img/default_avatar.svg"),
    phone: joi.string(),
    email: joi.string().email(),
    gender: joi.string().default('男'),
    location: joi.string().default('中国'),//国家,省份,城市,区县, 
    roles: joi.array().items(joi.string()).default([]),
    birthday: joi.date().default("2000-01-01"),
    rest: joi.number().default(0)//余额
})
var userModel = model("user", userSchema);
module.exports = { userModel, userValidator };