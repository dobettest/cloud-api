var mongoose = require('mongoose')
var { Schema, model } = mongoose;
var joi = require('@hapi/joi')
var roleSchema = new Schema({
    roleName: String,
    groupID: String,
    services: Array
})
var roleModel = model("role", roleSchema);
var roleValidator = joi.object({
    roleName: joi.string().required(),
    groupID: joi.string().required(),
    services: joi.array()
})
module.exports = { roleModel, roleValidator };