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
  // 用户添加或修改个人信息
  async updateInfo(ctx, next) {
    const userInfo = ctx.request.body;
    const { userId } = ctx.request.params;
    const result = await userService.updateInfo(userInfo, userId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 用户获取个人信息
  async getUserInfoById(ctx, next) {
    const { userId } = ctx.request.params;
    const result = await userService.getUserInfoById(userId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 管理员获取用户列表
  async getUserList(ctx, next) {
    const result = await userService.getUserList();
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
}

module.exports = new UserController();
