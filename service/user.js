var { userModel, userValidator } = require("../model/user");
var { validate } = require('../util/index');
var jwt = require('jsonwebtoken');
var TLSSigAPIv2 = require('tls-sig-api-v2');
const { roleModel } = require("../model/role");
const { companyModel } = require("../model/company");
// var TLSSigAPIv2 = require('./TLSSigAPIv2'); // 源码集成需要使用相对路径
const api = new TLSSigAPIv2.Api(1400586279, "5858d9cc495b85fde0a8216ed92cdcd6266d7d4e841769cc80dd9fabb8e5b603");
exports.main = async (event, context) => {
    let { userID } = event;
    return {
        userSign: api.genSig(userID, 86400 * 180)
    }
};
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
        return await userModel.findOne(obj, {
            _v: 0,
            _id: 0
        });
    }
    static async delete(obj) {
        return await userModel.deleteMany(obj);
    }
    static async list(obj) {
        return await userModel.find(obj);
    }
    static createTimTicket(obj) {
        let { userID } = obj;
        return api.genSig(userID, 86400 * 180)
    }
    static async cost(obj) {

    }
    static createToken(payload) {
        return jwt.sign(payload, 'dadb0a1798', { expiresIn: '1 days' });
    }
    static async getWorkstations(roles) {
        roles = await roleModel.find({
            _id: { $in: roles }
        })
        roles = await roles.reduce(async (data, current) => {
            let company = await companyModel.findOne({
                companyID: current['groupID']
            }, {
                'private_key': 0,
                'private_key_id': 0,
                __v: 0,
                _id: 0
            })
            let combine = Object.assign(current, company);
            data.push(combine);
            return data;
        }, []);
        return roles;
    }
}
module.exports = userService;