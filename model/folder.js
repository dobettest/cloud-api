var mongoose = require('mongoose')
var { Schema, model } = mongoose;
var joi = require('@hapi/joi');
const { nanoid } = require('nanoid');
var folderSchema = new Schema({
    folderID: String,
    folderName: String,
    creator: String,
    cdate: Date,
    files: Array
})
var folderModel = model("folder", folderSchema);
var folderValidator = joi.object({
    folderID: joi.string().default(nanoid()),
    folderName: joi.string().required(),
    creator: joi.string().required(),
    cdate: joi.date().default(Date.now()),
    files: joi.array()
})
module.exports = { folderModel, folderValidator };