var { Router } = require('express');
var router = Router();
var folderService = require('../service/folder')
router.post('/create', async function (req, res, next) {
    try {
        await folderService.create(req.body);
    } catch (error) {
        next(error)
    }
})
router.post('/access', async function (req, res, next) {
    try {
        let folder = await folderService.read(req.body);
        res.json({
            data: folder
        })
    } catch (error) {
        next(error)
    }
})
router.post('/list', async function (req, res, next) {
    try {
        let list = await folderService.list(req.body);
        res.json({
            data: list
        })
    } catch (error) {
        next(error)
    }
})
router.post('/modify', async function (req, res, next) {
    try {
        await folderService.update(req.body);
        res.json({
            data: null
        })
    } catch (error) {
        next(error)
    }
})
router.post('/delete', async function (req, res, next) {
    try {
        await folderService.delete(req.body);
        res.json({
            data: null
        })
    } catch (error) {
        next(error);
    }
})
module.exports = router;