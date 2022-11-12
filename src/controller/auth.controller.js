const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
const userService = require("../service/user.service");

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
  // 验证token成功
  async success(ctx, next) {
    ctx.body = {
      status: 200,
      message: "验证成功",
      data: null,
    };
  }
  // 获取登录用户信息
  async getUserInfoById(ctx, next) {
    const { id } = ctx.user;
    const result = await userService.getUserInfoById(id);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
}

module.exports = new AuthController();
