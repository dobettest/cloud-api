var mongoose = require('mongoose')
var { Schema, model } = mongoose;
var joi = require('@hapi/joi');
const { nanoid } = require('nanoid');
var storageSchema = new Schema({
    storageID: String,
    envID: String,
    creator: String,
    cdate: Date,
    total: String,
    consume: String
})
var storageModel = model("storage", storageSchema);
var storageValidator = joi.object({
    storageID: joi.string().default(nanoid()),
    envID: joi.string().required(),
    creator: joi.string().required(),
    cdate: joi.date().default(Date.now()),
    total: joi.number().default('5GB'),
    consume: joi.string().default(0)
})
module.exports = { storageModel, storageValidator };