const userService = require("../service/user.service");

class UserController {
  // 用户注册
  async create(ctx, next) {
    const user = ctx.request.body;
    const result = await userService.create(user);
    ctx.body = {
      status: 200,
      message: "注册用户成功",
      data: result,
    };
  }
}

module.exports = new UserController();
