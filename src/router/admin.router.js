const Router = require("koa-router");

const {
  addNotice,
  updateNotice,
  deleteNotice,
  getNoticeById,
  getOutList,
  getOutByRealname,
  getOutByEnd,
  getOutByTime,
  updateOutById,
  getOutById,
  deleteById,
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
// 根据住户真实姓名查询外出报备
adminRouter.post(
  "/manage/out/realname",
  verifyAuth,
  verifyPermission,
  getOutByRealname
);
// 根据指定结束地点的外出报备
adminRouter.post("/manage/out/end", verifyAuth, verifyPermission, getOutByEnd);
// 根据时间段查询外出报备
adminRouter.post(
  "/manage/out/time",
  verifyAuth,
  verifyPermission,
  getOutByTime
);
// 修改某条外出报备
adminRouter.patch(
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

module.exports = adminRouter;
