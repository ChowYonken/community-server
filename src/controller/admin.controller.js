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
  // 查看外出人员总数
  async getOutTotal(ctx, next) {
    const { end, startTime, endTime } = ctx.request.body;
    const result = await adminService.getOutTotal(end, startTime, endTime);
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
  // 根据指定结束地点或时间段的外出报备
  async getOutByEndOrTime(ctx, next) {
    const { offset, limit, end, startTime, endTime } = ctx.request.body;
    const result = await adminService.getOutByEndOrTime(
      offset,
      limit,
      end,
      startTime,
      endTime
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
  // 查询所有住户的健康信息
  async getHealthList(ctx, next) {
    const { offset, limit } = ctx.request.body;
    const result = await adminService.getHealthList(offset, limit);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 获取住户健康信息总数
  async getHealthTotal(ctx, next) {
    const { homeTemp, healthCode, startTime, endTime } = ctx.request.body;
    const result = await adminService.getHealthTotal(
      homeTemp,
      healthCode,
      startTime,
      endTime
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 查询指定id住户的健康信息
  async getHealthById(ctx, next) {
    const { userId } = ctx.request.params;
    const result = await adminService.getHealthById(userId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 查询指定高于某温度的住户健康信息
  async getHealthByHomeTemp(ctx, next) {
    const { offset, limit, homeTemp } = ctx.request.body;
    const result = await adminService.getHealthByHomeTemp(
      offset,
      limit,
      homeTemp
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 查询根据健康码颜色的住户健康信息
  async getHealthByHealthCode(ctx, next) {
    const { offset, limit, healthCode } = ctx.request.body;
    const result = await adminService.getHealthByHealthCode(
      offset,
      limit,
      healthCode
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 查询指定时间段的健康信息
  async getHealthByTime(ctx, next) {
    const { offset, limit, startTime, endTime } = ctx.request.body;
    const result = await adminService.getHealthByTime(
      offset,
      limit,
      startTime,
      endTime
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 修改某条健康信息
  async updateHealth(ctx, next) {
    const { homeTemp, status, riskAreas, healthCode, others } =
      ctx.request.body;
    const { healthId } = ctx.request.params;
    const result = await adminService.updateHealth(
      homeTemp,
      status,
      riskAreas,
      healthCode,
      others,
      healthId
    );
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
  // 删除某条健康信息
  async deleteHealth(ctx, next) {
    const { healthId } = ctx.request.params;
    const result = await adminService.deleteHealth(healthId);
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  }
}

module.exports = new AdminController();
