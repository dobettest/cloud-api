var { Router } = require('express');
const cosService = require('../service/cos');
var router = Router();
var vblogService = require('../service/vblog');
var Busboy = require('busboy');
router.post('/create', async function (req, res, next) {
    try {
        // await vblogService.create(req.body);
        // res.json({
        //     message: '动态创建成功'
        // })
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            cosService.upload(file,filename);
        });
        busboy.on('finish', function () {
            // res.writeHead(200, { 'Connection': 'close' });
            // res.end("That's all folks!");
            res.sendStatus(200)
        });
        busboy.on('error', function (error) {
            next(error)
        })
        return req.pipe(busboy);

    } catch (error) {
        next(error)
    }
})
router.post('/access', async function (req, res, next) {
    try {
        let vblog = await vblogService.read(req.body);
        res.json({
            data: vblog
        })
    } catch (error) {
        next(error)
    }
})
router.post('/list', async function (req, res, next) {
    try {
        let list = await vblogService.list(req.body);
        res.json({
            data: list
        })
    } catch (error) {
        next(error)
    }
})
router.post('/modify', async function (req, res, next) {
    try {
        await vblogService.update(req.body);
        res.json({
            data: null
        })
    } catch (error) {
        next(error)
    }
})
router.post('/delete', async function (req, res, next) {
    try {
        await vblogService.delete(req.body);
        res.json({
            data: null
        })
    } catch (error) {
        next(error);
    }
})
module.exports = router;