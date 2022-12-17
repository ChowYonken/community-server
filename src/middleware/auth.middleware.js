const jwt = require("jsonwebtoken");

const errorTypes = require("../constants/error-types");
const userService = require("../service/user.service");
const authService = require("../service/auth.service");
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
    console.log(err);
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

// 权限验证
const verifyPermission = async (ctx, next) => {
  const { id } = ctx.user;
  const result = await userService.getUserInfoById(id);
  if (result.role.id !== 1) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

// 判断用户是否修改自己的信息
const verifyPermissionByUser = async (ctx, next) => {
  // 1.获取参数
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace("Id", "");
  const resourceId = ctx.params[resourceKey];
  const { account } = ctx.user;
  // 2.查询是否具备权限
  try {
    const isPermission = await authService.checkResource(
      tableName,
      resourceId,
      account
    );
    if (!isPermission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
};

// 判断旧密码是否正确
const verifyOldPwd = async (ctx, next) => {
  const { oldPwd, newPwd } = ctx.request.body;
  const { id } = ctx.user;
  // 新密码加密
  ctx.request.body.newPwd = md5password(newPwd);
  const { password } = await userService.getPwdById(id);
  // 判断密码是否正确
  if (md5password(oldPwd) !== password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
  verifyPermissionByUser,
  verifyOldPwd,
};
