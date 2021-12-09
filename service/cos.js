const { createSingleon: createCosClient } = require('tencent-oss/utils/oss');
const path = require('path');
const cos = createCosClient({
    sts: {
        clientConfig: {
            credential: {
                secretId: 'AKIDd4FBsKHgeP1PcaEkxyjETSCgusd8NxJQ',
                secretKey: '1nKhogIeldGdp69xXsypQ1Tm1YFk02qP'
            },
            region: "ap-guangzhou",
            profile: {
                httpProfile: {
                    endpoint: "sts.tencentcloudapi.com",
                },
            },
        },
        "Name": "access",
        Policy: {
            "version": "2.0",
            "statement": [
                {
                    "effect": "allow",
                    "action": [
                        "cos:PutObject",
                        "cos:GetObject",
                        "cos:HeadObject",
                        "cos:OptionsObject",
                        "cos:ListParts",
                        "cos:GetObjectTagging"
                    ],
                    "resource": "*"
                }
            ]
        }
    }
});
class cosService {
    constructor() {

    }
    static async upload(stream, filename) {
        let client = await cos;
        client.putObject({
            Bucket: 'emoji-1257758405', /* 必须 */
            Region: 'ap-guangzhou',    /* 必须 */
            Key: path.basename(filename),              /* 必须 */
            Body: stream, // 上传文件对象
        }, function (err, data) {
            console.log(err || data);
        });
    }
    static async delete(obj) {

    }
}
module.exports = cosService;