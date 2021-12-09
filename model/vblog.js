var mongoose = require('mongoose')
var { Schema, model } = mongoose;
var joi = require('@hapi/joi')
var vblogSchema = new Schema({
    albumList: Array,
    author: String,
    commentList: Array,
    data: String,
    likeList: Array,
    pdate: Date,
    position: '',
    tags: Array
})
var vblogModel = model("vblog", vblogSchema);
var vblogValidator = joi.object({
    albumList: joi.array(),
    author: joi.string().required(),
    commentList: joi.array(),
    data: joi.string(),
    likeList: joi.array(),
    pdate: joi.date().default(Date.now()),
    position: '',
    tags: joi.array()
})
module.exports = { vblogModel, vblogValidator };