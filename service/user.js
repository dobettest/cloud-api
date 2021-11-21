var { userModel, userValidator } = require("../model/user");
var { validate } = require('../util/index');
var jwt = require('jsonwebtoken');
class userService {
    constructor() {

    }
    static async create(obj) {
        let user = await validate(userValidator, obj);
        await userModel.create(user);
    }
    static async update(obj) {
        return await userModel.findOneAndUpdate(obj['filter'], obj['newVal'])
    }
    static async read(obj) {
        return await userModel.findOne(obj);
    }
    static async delete(obj) {
        return await userModel.deleteMany(obj);
    }
    static async list(obj) {
        return await userModel.find(obj);
    }
    static async createTicket() {

    }
    static async cost(obj) {

    }
    static createToken(payload) {
        return jwt.sign(payload, 'dadb0a1798', { expiresIn:'1 days' });
    }
}
module.exports = userService;