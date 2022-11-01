const Router = require("koa-router");

const {
  updateInfo,
  getUserInfoById,
  getUserList,
  deleteInfo,
  addUser,
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
// 管理员获取用户列表
userRouter.get("/", verifyAuth, verifyPermission, getUserList);
// 管理员获取某个用户信息
userRouter.get("/:userId", verifyAuth, verifyPermission, getUserInfoById);
// 添加用户
userRouter.post("/", verifyAuth, verifyPermission, addUser);
// 管理员修改用户信息
userRouter.post("/:userId", verifyAuth, verifyPermission, updateInfo);
// 管理员删除用户
userRouter.delete("/:userId", verifyAuth, verifyPermission, deleteInfo);

module.exports = userRouter;
