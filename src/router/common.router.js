const Router = require("koa-router");

const {
  getMenuList,
  getMenuByRole,
  getNoticeList,
} = require("../controller/common.controller");

const { verifyAuth } = require("../middleware/auth.middleware");

const commonRouter = new Router();

// 查询所有菜单
commonRouter.get("/menu/list", verifyAuth, getMenuList);
// 查询某个角色的菜单
commonRouter.get("/role/:roleId/menu", verifyAuth, getMenuByRole);
// 查询公告列表
commonRouter.post("/main/notice/list", verifyAuth, getNoticeList);

module.exports = commonRouter;
