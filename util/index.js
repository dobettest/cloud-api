function genCode(len = 6) {
    return Math.random().toString().slice(len * -1);
}
function ranStr() {
    var str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";

    return str.split("").sort(function () {
        return Math.random() - 0.5
    });
}
async function validate(validator, value) {
    try {
        return await validator.validateAsync(value);
    } catch (error) {
        let errStr = error['details'].reduce((str, next) => {
            return str.concat(next['message']);
        }, '');
        throw new Error(errStr);
    }
}
module.exports = {
    genCode,
    ranStr,
    validate
}