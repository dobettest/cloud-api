var { Router } = require('express');
var router = Router();
var storageService = require('../service/storage')
router.post('/create', async function (req, res, next) {
    try {
        await storageService.create(req.body);
        res.json({
            data:null,
            message:'创建成功'
        })
    } catch (error) {
        next(error)
    }
})
router.post('/access', async function (req, res, next) {
    try {
        let storage = await storageService.read(req.body);
        res.json({
            data: storage
        })
    } catch (error) {
        next(error)
    }
})
router.post('/list', async function (req, res, next) {
    try {
        let list = await storageService.list(req.body);
        res.json({
            data: list
        })
    } catch (error) {
        next(error)
    }
})
router.post('/modify', async function (req, res, next) {
    try {
        await storageService.update(req.body);
        res.json({
            data: null
        })
    } catch (error) {
        next(error)
    }
})
router.post('/delete', async function (req, res, next) {
    try {
        await storageService.delete(req.body);
        res.json({
            data: null
        })
    } catch (error) {
        next(error);
    }
})
module.exports = router;