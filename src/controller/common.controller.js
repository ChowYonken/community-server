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
}

module.exports = new commonController();
