var { Router } = require('express');
var router = Router();
var service = require('../service/service');
router.post('/create', async function (req, res, next) {
    try {
        await service.create(req.body);
        res.json({
            message: '服务创建成功'
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router;