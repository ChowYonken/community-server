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
    const statement = `SELECT account, realname, cellphone, address FROM user WHERE id = ?;`;
    const [result] = await connections.execute(statement, [userId]);
    return result;
  }
  // 管理员获取用户列表
  async getUserList() {
    const statement = `SELECT account, realname, cellphone, address, suspected, createAt, updateAt FROM user;`;
    const [result] = await connections.execute(statement);
    return result;
  }
}

module.exports = new UserService();
