const Router = require("koa-router");

const {
  updateInfo,
  getUserInfoById,
  getUserList,
  getUserTotal,
  deleteInfo,
  addUser,
  isSuspected,
  suspectedList,
  queryByRealnameOrAddress,
  getNoticeByPriority,
  addOut,
  addHealth,
  getSuspectedTotal,
} = require("../controller/user.controller");

const {
  verifyAuth,
  verifyPermission,
  verifyPermissionByUser,
} = require("../middleware/auth.middleware");

const userRouter = new Router({ prefix: "/main/user" });

// 用户添加或修改个人信息
userRouter.post(
  "/profile/:userId",
  verifyAuth,
  verifyPermissionByUser,
  updateInfo
);
// 用户获取个人信息
userRouter.get(
  "/profile/:userId",
  verifyAuth,
  verifyPermissionByUser,
  getUserInfoById
);
// 用户查询普通或紧急公告
userRouter.post("/notice", verifyAuth, getNoticeByPriority);
// 用户外出报备
userRouter.post("/out", verifyAuth, addOut);
// 用户健康申报
userRouter.post("/health", verifyAuth, addHealth);

// 管理员获取用户列表
userRouter.post("/list", verifyAuth, verifyPermission, getUserList);
// 获取用户总数
userRouter.post("/total", verifyAuth, getUserTotal);
// 管理员获取某个用户信息
userRouter.get("/:userId", verifyAuth, verifyPermission, getUserInfoById);
// 管理员根据真实名字或地址查询用户
userRouter.post(
  "/others",
  verifyAuth,
  verifyPermission,
  queryByRealnameOrAddress
);
// 管理员添加用户
userRouter.post("/", verifyAuth, verifyPermission, addUser);
// 管理员修改用户信息
userRouter.post("/:userId", verifyAuth, verifyPermission, updateInfo);
// 管理员删除用户
userRouter.delete("/:userId", verifyAuth, verifyPermission, deleteInfo);
// 管理员设疑似人员
userRouter.put("/:userId", verifyAuth, verifyPermission, isSuspected);
// 管理员查询所有疑似人员
userRouter.post("/suspected/list", verifyAuth, verifyPermission, suspectedList);
// 查看疑似人员总数
userRouter.get("/suspected/total", verifyAuth, getSuspectedTotal);

module.exports = userRouter;
