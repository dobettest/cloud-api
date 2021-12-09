var { folderModel, folderValidator } = require("../model/folder");
class folderService {
    constructor() {

    }
    static async create(obj) {
        console.log('folder', obj)
        let folder = await folderValidator.validateAsync(obj);
        return await folderModel.create(folder);
    }
    static async update(obj) {
        return await folderModel.findOneAndUpdate(obj['filter'], obj['newVal'])
    }
    static async read(obj) {
        return await folderModel.findOne(obj);
    }
    static async delete(obj) {
        return await folderModel.deleteMany(obj);
    }
    static async list(obj) {
        return await folderModel.find(obj);
    }
}
module.exports = folderService;