const Router = require("koa-router");

const {
  addNotice,
  updateNotice,
  deleteNotice,
  getNoticeById,
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

module.exports = adminRouter;
