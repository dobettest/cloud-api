var { vblogModel, vblogValidator } = require("../model/vblog");
class vblogService {
    constructor() {

    }
    static async create(obj) {
        console.log('vblog', obj)
        let vblog = await vblogValidator.validateAsync(obj);
        return await vblogModel.create(vblog);
    }
    static async update(obj) {
        return await vblogModel.findOneAndUpdate(obj['filter'], obj['newVal'])
    }
    static async read(obj) {
        return await vblogModel.findOne(obj);
    }
    static async delete(obj) {
        return await vblogModel.deleteMany(obj);
    }
    static async list(obj) {
        return await vblogModel.find(obj);
    }
}
module.exports = vblogService;