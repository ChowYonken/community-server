const connections = require("../app/database");

class UserService {
  // 用户注册
  async create(user) {
    const { account, password } = user;
    const statement = `INSERT INTO user (account, password) VALUES (?, ?);`;
    const [result] = await connections.execute(statement, [account, password]);
    return result;
  }
  // 根据用户账号判断用户是否已注册
  async getUserByAccount(account) {
    const statement = `SELECT * FROM user WHERE account = ?;`;
    const [result] = await connections.execute(statement, [account]);
    return result;
  }
  // 用户添加或修改个人信息
  async updateInfo(userInfo, userId) {
    const { realname, cellphone, address } = userInfo;
    const statement = `UPDATE user SET realname = ?, cellphone = ?, address = ? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [
      realname,
      cellphone,
      address,
      userId,
    ]);
    return result;
  }
  // 用户获取个人信息
  async getUserInfoById(userId) {
    const statement = `SELECT 
                       u.id, u.account, u.realname, u.cellphone, u.address, u.suspected,
                       JSON_OBJECT("id", r.id, "name", r.name, "createTime", r.createAt, "updateTime", r.updateAt) role,
                       u.createAt createTime, u.updateAt updateTime
                       FROM user u
                       LEFT JOIN user_role ur ON ur.user_id = u.id
                       LEFT JOIN role r ON r.id = ur.role_id
                       WHERE u.id = ?;`;
    const [result] = await connections.execute(statement, [userId]);
    return result;
  }
  // 管理员获取用户列表
  async getUserList() {
    const statement = `SELECT 
                       u.id, u.account, u.realname, u.cellphone, u.address, u.suspected,
                       JSON_OBJECT("id", r.id, "name", r.name, "createTime", r.createAt, "updateTime", r.updateAt) role,
                       u.createAt createTime, u.updateAt updateTime
                       FROM user u
                       LEFT JOIN user_role ur ON ur.user_id = u.id
                       LEFT JOIN role r ON r.id = ur.role_id`;
    const [result] = await connections.execute(statement);
    return result;
  }
}

module.exports = new UserService();
