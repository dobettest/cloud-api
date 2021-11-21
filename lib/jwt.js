const jwt = require('jsonwebtoken');
module.exports = function (config) {
    return function (req, res, next) {
        try {
            let { url, headers } = req;
            switch (true) {
                case config['allows'].indexOf(url) !== -1:
                    next();
                    break;
                case Object.prototype.hasOwnProperty.call(headers, 'authorization'):
                    let user = jwt.verify(headers['authorization'], config['secret'])
                    req.user = user;
                    next();
                    break;
                default:
                    next(new Error('无权访问'));
                    break;
            }
        } catch (error) {
            next(error)
        }
    }
}