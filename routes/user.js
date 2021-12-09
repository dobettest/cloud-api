var express = require('express');
var router = express.Router();
var userService = require('../service/user');
var commonService = require('../service/common');
const { genCode } = require('../util');
const { minutes } = require('../util/time');
const cloudbaseService = require('../service/cloudbase');
const companyService = require('../service/company');
let mailClient = commonService.createEmailClient();
let smsClient = commonService.createSmsClient();
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', async function (req, res, next) {
  try {
    await userService.create(req.body);
    res.json({
      message: '用户注册成功'
    })
  } catch (error) {
    next(error)
  }
})
router.post('/login', async function (req, res, next) {
  try {
    let { account, password } = req.body;
    let data = await Promise.all([userService.read({ phone: account, password }), userService.read({ userID: account, password })])
    switch (true) {
      case data.some(v => v !== null):
        let user = data.find(v => v !== null);
        let token = await userService.createToken(user.toJSON());
        res.json({
          data: token
        })
        break;
      default:
        next(new Error('密码错误'));
        break;
    }
  } catch (error) {
    next(error)
  }
})
router.post('/loginByPhone', async function (req, res, next) {
  try {
    let { phone } = req.body;
    let user = await userService.read({ phone });
    let token = await userService.createToken(user.toJSON());
    res.json({
      data: token
    })
  } catch (error) {
    next(error)
  }
})
router.post('/getWorkstations', async function (req, res, next) {
  try {
    let { roles } = req.user;
    let data = await userService.getWorkstations(roles);
    res.json(
      {
        data
      }
    )
  } catch (error) {
    next(error)
  }
})
router.post('/userInfo', async function (req, res, next) {
  try {
    const { userID } = req.user;
    let user = await userService.read({ userID }, { password: 0, _v: 0 })
    res.json({
      data: user
    })
  } catch (error) {
    next(error)
  }
})
router.post('/delete', async function (req, res, next) {
  try {
    await userService.delete(req.body);
    res.json({
      data: null
    })
  } catch (error) {
    next(error)
  }
})
router.post('/list', async function (req, res, next) {
  try {
    const users = await userService.list(req.body);
    res.json({
      data: users
    })
  } catch (error) {
    next(error)
  }
})
router.get('/getImgCode', async function (req, res, next) {
  try {
    let { img, str } = commonService.genImgCode();
    let checkid = Date.now()
    const state = await commonService.redisClient.set(`${checkid}-${str}`, str, "EX", minutes * 5)
    console.log(state, `${checkid}-${str}`)
    res.json({
      data: {
        img,
        checkid
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.post('/checkImgCode', async function (req, res, next) {
  try {
    let { str, checkid } = req.body;
    const state = await commonService.redisClient.get(`${checkid}-${str}`)
    switch (true) {
      case state !== str:
      case null:
        next(new Error('验证码错误'));
        break;
      default:
        res.json({
          data: null
        })
        break;
    }
    res.json({
      data: null
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.post('/getCodeByPhone', async function (req, res, next) {
  try {
    let { TemplateId, phone } = req.body;
    let code = genCode();
    console.log('TemplateId', TemplateId, typeof TemplateId)
    const { SendStatusSet: [{ Message }] } = await smsClient.SendSms({
      SmsSdkAppId: "1400277599",
      /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
      SignName: "云督系统",
      /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
       * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
      PhoneNumberSet: ["+86" + phone],
      /* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
      TemplateId,
      /* 模板参数: 若无模板参数，则设置为空*/
      TemplateParamSet: [code],
    })
    switch (Message) {
      case 'send success':
        await commonService.redisClient.set(phone, code, 'EX', minutes * 5);
        res.json({
          message: '短信发送成功'
        })
        break;
      default:
        next(new Error('短信发送失败'))
        break;
    }
  } catch (error) {
    next(error)
  }
})
router.post('/checkCodeByPhone', async function (req, res, next) {
  try {
    let { phone, code } = req.body;
    let state = await commonService.redisClient.get(phone);
    console.log('state', state, code)
    switch (true) {
      case state !== code:
      case state === null:
        next(new Error('验证码错误'))
        break;
      default:
        res.json({
          data: null
        })
        break;
    }
  } catch (error) {
    next(error)
  }
})
router.post('/getCodeByMail', async function (req, res, next) {
  try {
    let { mail, TemplateId } = req.body;
    let html = '';
    let code = '';
    console.log('TemplateId', TemplateId, typeof TemplateId)
    switch (TemplateId) {
      case 748383:
        code = genCode();
        html = `您正在使用此邮箱登录，您的验证码是${code},请不要轻易泄露，以免造成对您的损失`
        break;
      case 1202596:
        code = genCode();
        html = `您正在使用此邮箱注册，您的验证码是${code},请不要轻易泄露，以免造成对您的损失`
        break;
      case 1187916:
        code = genCode();
        html = `你正在使用此邮箱绑定微云台,如非本人操作,请忽略,确认点击`;
        break;
      case 1187910:
        code = genCode();
        html = `你正在进行密码重置操作,您的验证码为:${code},如非本人操作,请忽略,确认点击`;
        break;
      default:
        break;
    }
    const mailOptions = {
      from: "认证邮件<1364525216@qq.com>",
      to: `${mail}`,
      subject: '微云台',
      html,
    };
    await mailClient.sendMail(mailOptions);
    await commonService.redisClient.set(mail, code, 'EX', minutes * 5)
    res.json({
      data: null
    })
  } catch (error) {
    next(error)
  }
})
router.post('/checkCodeByMail', async function (req, res, next) {
  try {
    let { mail, code } = req.body;
    let state = await commonService.redisClient.get(mail);
    switch (true) {
      case state !== code:
      case null:
        next(new Error('验证码错误'))
        break;
      default:
        res.json({
          data: null
        })
        break;
    }
  } catch (error) {
    next(error)
  }
})
router.post('/cloudbase/createTicket', async function (req, res, next) {
  try {
    let company = await companyService.read(req.body);
    let { private_key_id, private_key, envID } = company;
    let { userID } = req.user;
    let ticket = await cloudbaseService.createTicket(envID, userID, private_key_id, private_key);
    res.json({
      data: ticket
    })
  } catch (error) {
    next(error)
  }
})
router.post('/tim/createTicket', async function (req, res, next) {
  try {
    let userSig = await userService.createTimTicket(req.body);
    res.json({
      data: userSig
    })
  } catch (error) {
    next(error)
  }
})
router.post('/upload', async function (req, res, next) {
  try {
    console.log('upload', req.body)
    res.json({
      data: null
    })
  } catch (error) {
    next(error)
  }
})
module.exports = router;
