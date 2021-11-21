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
router.post('/login', async function (req, res, next) {
    let { userID, env } = req.body;
    let ticket = await companyService.createTicket({ env, customUserId: userID });

})
module.exports = router;