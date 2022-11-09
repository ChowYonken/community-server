const userService = require("../service/user.service");
const errorTypes = require("../constants/error-types");
const md5password = require("../utils/password-handle");

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
  // 管理员或用户修改个人信息
  async updateInfo(ctx, next) {
    const userInfo = ctx.request.body;
    const { userId } = ctx.request.params;
    const { address } = ctx.request.body;
    const isExist = await userService.checkAddressById(address, userId);
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
  // 管理员根据真实姓名或地址查询用户
  async queryByRealnameOrAddress(ctx, next) {
    const { offset, limit } = ctx.request.body;
    const { realname, address } = ctx.request.query;
    const result = await userService.queryByRealnameOrAddress(
      realname,
      address,
      offset,
      limit
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 管理员添加用户
  async addUser(ctx, next) {
    const info = ctx.request.body;
    // 密码加密
    const { password } = ctx.request.body;
    ctx.request.body.password = md5password(password);

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
  // 用户查询普通或紧急公告
  async getNoticeByPriority(ctx, next) {
    const { offset, limit, priority, timeStart, timeEnd } = ctx.request.body;
    const result = await userService.getNoticeByPriority(
      offset,
      limit,
      priority,
      timeStart,
      timeEnd
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 用户外出报备
  async addOut(ctx, next) {
    const { start, end, startTime, endTime, transportation } = ctx.request.body;
    const { id } = ctx.user;
    const result = await userService.addOut(
      start,
      end,
      startTime,
      endTime,
      transportation,
      id
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 用户健康申报
  async addHealth(ctx, next) {
    const { homeTemp, status, riskAreas, healthCode, others } =
      ctx.request.body;
    const { id } = ctx.user;
    const result = await userService.addHealth(
      homeTemp,
      status,
      riskAreas,
      healthCode,
      others,
      id
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
}

module.exports = new UserController();
