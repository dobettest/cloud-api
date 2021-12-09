var { roleModel, roleValidator } = require("../model/role");
class roleService {
    constructor() {

    }
    /**
     * 
     * @returns 返回默认用户Route
     */
    static async getBaseRoute() {
        return await roleModel.findOne({
            groupID: 'cXq5WarswhFuqsomo8ZEq',
            roleName: '默认用户'
        })
    }
    /**
     * 
     * @returns 返回默认管理员Route
     */
    static async getManageRoute() {
        return await roleModel.findOne({
            groupID: 'cXq5WarswhFuqsomo8ZEq',
            roleName: '默认管理员'
        });

    }
    static async create(obj) {
        console.log('role', obj)
        let role = await roleValidator.validateAsync(obj);
        return await roleModel.create(role);
    }
    static async update(obj) {
        return await roleModel.findOneAndUpdate(obj['filter'], obj['newVal'])
    }
    static async read(obj) {
        return await roleModel.findOne(obj);
    }
    static async delete(obj) {
        return await roleModel.deleteMany(obj);
    }
    static async list(obj) {
        return await roleModel.find(obj);
    }
}
module.exports = roleService;