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
  // 根据id查询某条公告
  async getNoticeById(ctx, next) {
    const { noticeId } = ctx.request.params;
    const result = await adminService.getNoticeById(noticeId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 查询所有外出人员
  async getOutList(ctx, next) {
    const { offset, limit } = ctx.request.body;
    const result = await adminService.getOutList(offset, limit);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 根据住户真实姓名查询外出报备
  async getOutByRealname(ctx, next) {
    const { realname } = ctx.request.body;
    const result = await adminService.getOutByRealname(realname);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 根据指定结束地点的外出报备
  async getOutByEnd(ctx, next) {
    const { offset, limit } = ctx.request.body;
    const { end } = ctx.request.body;
    const result = await adminService.getOutByEnd(end, offset, limit);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 根据时间段查询外出报备
  async getOutByTime(ctx, next) {
    const { offset, limit } = ctx.request.body;
    const { startTime, endTime } = ctx.request.body;
    const result = await adminService.getOutByTime(
      startTime,
      endTime,
      offset,
      limit
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 修改某条外出报备
  async updateOutById(ctx, next) {
    const { start, end, startTime, endTime, transportation, user_id } =
      ctx.request.body;
    const { outId } = ctx.request.params;
    const result = await adminService.updateOutById(
      start,
      end,
      startTime,
      endTime,
      transportation,
      user_id,
      outId
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 查询指定id的外出报备
  async getOutById(ctx, next) {
    const { outId } = ctx.request.params;
    const result = await adminService.getOutById(outId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 删除指定id的外出设备
  async deleteById(ctx, next) {
    const { outId } = ctx.request.params;
    const result = await adminService.deleteById(outId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
}

module.exports = new AdminController();
