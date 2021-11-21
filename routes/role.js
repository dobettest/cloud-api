var { Router } = require('express');
var router = Router();
var roleService = require('../service/role')
router.post('/create', async function (req, res, next) {
    try {
        await roleService.create(req.body);
        res.json({
            message: '角色创建成功'
        })
    } catch (error) {
        next(error)
    }
})
router.post('/access', async function (req, res, next) {
    try {
        let role = await roleService.read(req.body);
        res.json({
            data: role
        })
    } catch (error) {
        next(error)
    }
})
router.post('/list', async function (req, res, next) {
    try {
        let list = await roleService.list(req.body);
        res.json({
            data: list
        })
    } catch (error) {
        next(error)
    }
})
router.post('/modify', async function (req, res, next) {
    try {
        await roleService.update(req.body);
        res.json({
            data: null
        })
    } catch (error) {
        next(error)
    }
})
router.post('/delete', async function (req, res, next) {
    try {
        await roleService.delete(req.body);
        res.json({
            data: null
        })
    } catch (error) {
        next(error);
    }
})
module.exports = router;