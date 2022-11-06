const adminService = require("../service/admin.service");

class AdminController {
  // 新增公告
  async addNotice(ctx, next) {
    const { title, content, priority } = ctx.request.body;
    const result = await adminService.addNotice(title, content, priority);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 修改公告
  async updateNotice(ctx, next) {
    const { noticeId } = ctx.request.params;
    const { title, content, priority } = ctx.request.body;
    const result = await adminService.updateNotice(
      title,
      content,
      priority,
      noticeId
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 删除公告
  async deleteNotice(ctx, next) {
    const { noticeId } = ctx.request.params;
    const result = await adminService.deleteNotice(noticeId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
}

module.exports = new AdminController();
