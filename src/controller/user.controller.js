const userService = require("../service/user.service");
const errorTypes = require("../constants/error-types");

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
  // 管理员或用户添加或修改个人信息
  async updateInfo(ctx, next) {
    const userInfo = ctx.request.body;
    const { userId } = ctx.request.params;
    const { address } = ctx.request.body;
    const isExist = await userService.checkAddress(address, userId);
    if (isExist) {
      const error = new Error(errorTypes.ADDRESS_ALREADY_EXISTS);
      return ctx.app.emit("error", error, ctx);
    }
    const result = await userService.updateInfo(userInfo, userId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 管理员或用户获取个人信息
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
    const { offset, limit } = ctx.request.body;
    const result = await userService.getUserList(offset, limit);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 管理员添加用户
  async addUser(ctx, next) {
    const info = ctx.request.body;
    const { address } = ctx.request.body;
    const isExist = await userService.checkAddress(address);
    if (isExist) {
      const error = new Error(errorTypes.ADDRESS_ALREADY_EXISTS);
      return ctx.app.emit("error", error, ctx);
    }
    const result = await userService.addUser(info);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 管理员删除用户
  async deleteInfo(ctx, next) {
    const { userId } = ctx.request.params;
    const result = await userService.deleteInfo(userId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 管理员设疑似人员
  async isSuspected(ctx, next) {
    const { userId } = ctx.request.params;
    const { mode } = ctx.request.body;
    const result = await userService.isSuspected(mode, userId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 管理员查询疑似人员列表
  async suspectedList(ctx, next) {
    const { offset, limit } = ctx.request.body;
    const result = await userService.suspectedList(offset, limit);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
}

module.exports = new UserController();
