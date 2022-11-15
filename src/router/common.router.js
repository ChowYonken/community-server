const Router = require("koa-router");

const {
  getMenuList,
  getMenuByRole,
  getNoticeList,
  gethealthCodeCounts,
  getNewNotice,
} = require("../controller/common.controller");

const { verifyAuth } = require("../middleware/auth.middleware");

const commonRouter = new Router();

// 查询所有菜单
commonRouter.get("/menu/list", verifyAuth, getMenuList);
// 查询某个角色的菜单
commonRouter.get("/role/:roleId/menu", verifyAuth, getMenuByRole);
// 查询公告列表
commonRouter.post("/main/notice/list", verifyAuth, getNoticeList);
// 查询最新公告
commonRouter.get("/main/notice/new", verifyAuth, getNewNotice);
// 查询红绿黄码数量
commonRouter.get("/main/healthCode/counts", verifyAuth, gethealthCodeCounts);

module.exports = commonRouter;
