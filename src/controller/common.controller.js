const commonService = require("../service/common.service");

class commonController {
  // 查询所有菜单
  async getMenuList(ctx, next) {
    const result = await commonService.getMenuList();
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 查询某个角色的菜单
  async getMenuByRole(ctx, next) {
    const { roleId } = ctx.request.params;
    const result = await commonService.getMenuByRole(roleId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 查询公告列表
  async getNoticeList(ctx, next) {
    const { offset, limit } = ctx.request.body;
    const result = await commonService.getNoticeList(offset, limit);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 查询最新公告
  async getNewNotice(ctx, next) {
    const result = await commonService.getNewNotice();
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 查询红绿黄码数量
  async gethealthCodeCounts(ctx, next) {
    const result = await commonService.gethealthCodeCounts();
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 获取公告总数
  async getNoticeTotal(ctx, next) {
    const { priority, timeStart, timeEnd } = ctx.request.body;
    const result = await commonService.getNoticeTotal(
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
  // 查询设备好坏情况
  async getDeviceCounts(ctx, next) {
    const result = await commonService.getDeviceCounts();
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 获取体温范围数量
  async getTempCounts(ctx, next) {
    const result = await commonService.getTempCounts();
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
}

module.exports = new commonController();
