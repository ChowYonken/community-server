const jwt = require("jsonwebtoken");

const errorTypes = require("../constants/error-types");
const userService = require("../service/user.service");
const md5password = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../app/config");

// 验证登录
const verifyLogin = async (ctx, next) => {
  const { account, password } = ctx.request.body;

  // 判断账号和密码是否为空
  if (!account || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断账号是否存在
  const result = await userService.getUserByAccount(account);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断密码是否正确
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;
  await next();
};

// 验证token
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;

  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
