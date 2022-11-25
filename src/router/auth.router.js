const Router = require("koa-router");

const {
  login,
  success,
  getUserInfoById,
  logout,
  updatePassword,
} = require("../controller/auth.controller");
const { create } = require("../controller/user.controller");

const {
  verifyLogin,
  verifyAuth,
  verifyOldPwd,
} = require("../middleware/auth.middleware");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");

const authRouter = new Router();

// 用户注册
authRouter.post("/register", verifyUser, handlePassword, create);
// 用户登录
authRouter.post("/login", verifyLogin, login);
// 验证token
authRouter.get("/test", verifyAuth, success);
// 获取登录用户信息
authRouter.get("/login/user", verifyAuth, getUserInfoById);
// 用户退出登录
authRouter.get("/logout", verifyAuth, logout);
// 修改密码
authRouter.patch("/updatePwd", verifyAuth, verifyOldPwd, updatePassword);

module.exports = authRouter;
