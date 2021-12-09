var { companyModel, companyValidator } = require("../model/company");
var roleService = require("../service/role");
var cloudbaseService = require('../service/cloudbase');
const userService = require("./user");
const { nanoid } = require('nanoid')
class companyService {
    constructor() {

    }
    static async create(obj) {
        const companyID = nanoid();
        //分配系统环境
        const envId = await cloudbaseService.create('test');
        //创建自定义登录密钥
        const { KeyID, PrivateKey } = await cloudbaseService.createCustomLoginKeys(envId);
        Object.assign(obj, {
            companyID,
            private_key_id: KeyID,
            private_key: PrivateKey,
            envID: envId,
        })
        let company = await companyValidator.validateAsync(obj);
        console.log('company', company);
        await companyModel.create(company);
        const { services } = await roleService.getManageRoute();
        //创建公司超管角色
        const { _id } = await roleService.create({
            roleName: '超级管理员',
            groupID: companyID,
            services
        })
        //创建公司超管用户
        await userService.create({
            userName: "超级管理员",
            roles: [_id]
        })
    }
    static async update(obj) {
        return await companyModel.findOneAndUpdate(obj['filter'], obj['newVal'])
    }
    static async read(obj) {
        return await companyModel.findOne(obj);
    }
    static async delete() {

    }
    static async list() {

    }
}
module.exports = companyService;