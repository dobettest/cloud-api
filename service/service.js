var { serviceModel, serviceValidator } = require('../model/service');
var { validate } = require('../util/index');
class service {
    constructor() {

    }
    static async create(obj) {
        let service = await validate(serviceValidator, obj);
        return await serviceModel.create(service);
    }
    static async update(obj) {
        return await serviceModel.findOneAndUpdate(obj['filter'], obj['newVal'])
    }
    static async read(obj) {
        return await serviceModel.findOne(obj);
    }
    static async delete(obj) {
        return await serviceModel.deleteMany(obj);
    }
    static async list(obj) {
        return await serviceModel.find(obj);
    }
}
module.exports = service;