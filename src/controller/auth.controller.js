const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  // 设置token
  async login(ctx, next) {
    const { account, id } = ctx.user;

    const token = jwt.sign({ account, id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });

    ctx.body = {
      status: 100,
      message: "登录成功",
      id,
      account,
      token,
    };
  }
  async success(ctx, next) {
    ctx.body = "授权成功~";
  }
}

module.exports = new AuthController();
