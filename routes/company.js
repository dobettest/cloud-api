var { Router } = require('express');
var router = Router();
var companyService = require('../service/company');
router.post('/create', async function (req, res, next) {
    try {
        await companyService.create(req.body);
        res.json({
            data: null
        })
    } catch (error) {
        next(error)
    }
})
router.post('/list', async function (req, res, next) {
    try {
        let companyies = await companyService.read(req.body);
        res.json({
            data: companyies
        })
    } catch (error) {
        next(error)
    }

})
module.exports = router;