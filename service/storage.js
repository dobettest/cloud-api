var { storageModel, storageValidator } = require("../model/storage");
const folderService = require("./folder");
class storageService {
    constructor() {

    }
    static async create(obj) {
        console.log('storage', obj)
        let storage = await storageValidator.validateAsync(obj);
        //创建根目录
        await folderService.create({
            folderName: '/',
            creator: storage['creator'],
            folderID: storage['storageID']
        })
        return await storageModel.create(storage);
    }
    static async update(obj) {
        return await storageModel.findOneAndUpdate(obj['filter'], obj['newVal'])
    }
    static async read(obj) {
        return await storageModel.findOne(obj);
    }
    static async delete(obj) {
        return await storageModel.deleteMany(obj);
    }
    static async list(obj) {
        return await storageModel.find(obj);
    }
}
module.exports = storageService;