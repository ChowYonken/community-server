const Router = require("koa-router");

const { login, success } = require("../controller/auth.controller");

const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");

const authRouter = new Router();

// 用户登录
authRouter.post("/login", verifyLogin, login);
// 验证token
authRouter.get("/test", verifyAuth, success);

module.exports = authRouter;
