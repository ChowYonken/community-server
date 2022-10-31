const Router = require("koa-router");

const {
  updateInfo,
  getUserInfoById,
  getUserList,
} = require("../controller/user.controller");

const { verifyAuth } = require("../middleware/auth.middleware");

const userRouter = new Router({ prefix: "/main/user" });

// 用户添加或修改个人信息
userRouter.post("/:userId", verifyAuth, updateInfo);
// 用户获取个人信息
userRouter.get("/:userId", verifyAuth, getUserInfoById);
// 管理员获取用户列表
userRouter.get("/", verifyAuth, getUserList);
module.exports = userRouter;
