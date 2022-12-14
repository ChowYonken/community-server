const Router = require("koa-router");

const {
  addNotice,
  updateNotice,
  deleteNotice,
  getNoticeById,
  getOutList,
  getOutTotal,
  getOutByRealname,
  getOutByEndOrTime,
  updateOutById,
  getOutById,
  deleteById,
  getHealthList,
  getHealthTotal,
  getHealthById,
  getHealthByHomeTemp,
  getHealthByHealthCode,
  getHealthByTime,
  updateHealth,
  deleteHealth,
  getDeviceList,
  getDeviceByNameOrstatus,
  getDeviceTotal,
  addDevice,
  updateDevice,
  deleteDevice,
  getTempList,
  getTempByoverOrStatus,
  getTempTotal,
  getEmergent,
  getRiskplaceTotal,
} = require("../controller/admin.controller");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

const adminRouter = new Router({ prefix: "/main" });

// 添加公告
adminRouter.post("/manage/notice", verifyAuth, verifyPermission, addNotice);
// 修改公告
adminRouter.post(
  "/manage/notice/:noticeId",
  verifyAuth,
  verifyPermission,
  updateNotice
);
// 删除公告
adminRouter.delete(
  "/manage/notice/:noticeId",
  verifyAuth,
  verifyPermission,
  deleteNotice
);
// 根据id查询某条公告
adminRouter.get(
  "/manage/notice/:noticeId",
  verifyAuth,
  verifyPermission,
  getNoticeById
);
// 查询所有外出人员
adminRouter.post("/manage/out/list", verifyAuth, verifyPermission, getOutList);
// 查询外出人员总数
adminRouter.post("/manage/out/total", verifyAuth, getOutTotal);
// 根据住户真实姓名查询外出报备
adminRouter.post(
  "/manage/out/realname",
  verifyAuth,
  verifyPermission,
  getOutByRealname
);
// 根据指定结束地点或时间段的外出报备
adminRouter.post(
  "/manage/out",
  verifyAuth,
  verifyPermission,
  getOutByEndOrTime
);
// 修改某条外出报备
adminRouter.post(
  "/manage/out/:outId",
  verifyAuth,
  verifyPermission,
  updateOutById
);
// 查询指定id的外出报备
adminRouter.get("/manage/out/:outId", verifyAuth, verifyPermission, getOutById);
// 删除指定id的外出设备
adminRouter.delete(
  "/manage/out/:outId",
  verifyAuth,
  verifyPermission,
  deleteById
);
// 查询所有住户的健康信息
adminRouter.post(
  "/manage/health/list",
  verifyAuth,
  verifyPermission,
  getHealthList
);
// 获取住户健康信息总数
adminRouter.post("/manage/health/total", verifyAuth, getHealthTotal);
// 查询指定id住户的健康信息
adminRouter.get(
  "/manage/health/:userId",
  verifyAuth,
  verifyPermission,
  getHealthById
);
// 查询指定高于某温度的住户健康信息
adminRouter.post(
  "/manage/health/homeTemp",
  verifyAuth,
  verifyPermission,
  getHealthByHomeTemp
);
// 查询根据健康码颜色的住户健康信息
adminRouter.post(
  "/manage/health/healthCode",
  verifyAuth,
  verifyPermission,
  getHealthByHealthCode
);
// 查询指定时间段的健康信息
adminRouter.post(
  "/manage/health/time",
  verifyAuth,
  verifyPermission,
  getHealthByTime
);
// 修改某条健康信息
adminRouter.post(
  "/manage/health/:healthId",
  verifyAuth,
  verifyPermission,
  updateHealth
);
// 删除某条健康信息
adminRouter.delete(
  "/manage/health/:healthId",
  verifyAuth,
  verifyPermission,
  deleteHealth
);
// 查询设备列表
adminRouter.post(
  "/manage/device/list",
  verifyAuth,
  verifyPermission,
  getDeviceList
);
// 根据设备名字或好坏程度查询
adminRouter.post(
  "/manage/device/query",
  verifyAuth,
  verifyPermission,
  getDeviceByNameOrstatus
);
// 查询设备总数
adminRouter.post(
  "/manage/device/total",
  verifyAuth,
  verifyPermission,
  getDeviceTotal
);
// 添加设备
adminRouter.post("/manage/device", verifyAuth, verifyPermission, addDevice);
// 修改设备
adminRouter.post(
  "/manage/device/:deviceId",
  verifyAuth,
  verifyPermission,
  updateDevice
);
// 删除设备
adminRouter.delete(
  "/manage/device/:deviceId",
  verifyAuth,
  verifyPermission,
  deleteDevice
);
// 获取所有温度
adminRouter.post(
  "/manage/temp/list",
  verifyAuth,
  verifyPermission,
  getTempList
);
// 根据温度或状态查询外出温度
adminRouter.post(
  "/manage/temp/query",
  verifyAuth,
  verifyPermission,
  getTempByoverOrStatus
);
// 查询外出温度总数
adminRouter.post(
  "/manage/temp/total",
  verifyAuth,
  verifyPermission,
  getTempTotal
);

module.exports = adminRouter;

// 输入高风险地区查找外出人员
adminRouter.post(
  "/manage/emergent/riskplace",
  verifyAuth,
  verifyPermission,
  getEmergent
);

adminRouter.post(
  "/manage/emergent/riskplace/total",
  verifyAuth,
  verifyPermission,
  getRiskplaceTotal
);
