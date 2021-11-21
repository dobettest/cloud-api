// 假设在上海地域 云函数下，则默认 region 为上海，信息一致
const CloudBase = require('@cloudbase/manager-node');
const tcb = require('@cloudbase/node-sdk');
const secretId = "AKIDd4FBsKHgeP1PcaEkxyjETSCgusd8NxJQ";
const secretKey = "1nKhogIeldGdp69xXsypQ1Tm1YFk02qP";
const { env } = new CloudBase({
    secretId,
    secretKey
})
class cloudbaseService {
    static secretId;
    static secretKey;
    static env;//管理员环境
    constructor(secretId = "AKIDd4FBsKHgeP1PcaEkxyjETSCgusd8NxJQ", secretKey = "1nKhogIeldGdp69xXsypQ1Tm1YFk02qP", region = "env-guangzhou") {
        this.init(secretId, secretKey);
    }
    static init(secretId = "AKIDd4FBsKHgeP1PcaEkxyjETSCgusd8NxJQ", secretKey = "1nKhogIeldGdp69xXsypQ1Tm1YFk02qP", region = "env-guangzhou") {
        this.secretId = secretId;
        this.secretKey = secretKey;
        const { env } = new CloudBase({
            secretId,
            secretKey,
            region
        })
        this.env = env;
    }
    static getEnvInfo() {

    }
    static async create(name) {
        const { envId } = await env.createEnv({
            name,
            paymentMode: 'postpay',
            channel: 'web'
        })
        return envId;
    }
    static createClient(envId) {
        const { env } = new CloudBase({
            secretId,
            secretKey,
            envId,
        })
        return env;
    }
    static async createCustomLoginKeys(envId) {
        const env = await this.createClient(envId);
        const { KeyID, PrivateKey } = await env.createCustomLoginKeys();
        return {
            KeyID,
            PrivateKey
        }
    }
    static async createTicket({ env, customUserId, private_key_id, private_key }) {
        try {
            const app = tcb.init({
                env,
                credentials: {
                    private_key_id,
                    private_key,
                    env_id: env
                }
            })
            const auth = app.auth();
            const ticket = auth.createTicket(customUserId, {
                refresh: 3600 * 1000 // access_token的刷新时间
            })
            return ticket;
        } catch (error) {
            console.log(error);
            return '';
        }
    }
}
module.exports = cloudbaseService;