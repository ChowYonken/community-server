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
  // 判断地址是否存在
  async checkAddress(address) {
    const statement = `SELECT * FROM user WHERE address = ?;`;
    const [result] = await connections.execute(statement, [address]);
    return result.length === 0 ? false : true;
  }
  // 管理员或用户添加或修改个人信息
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
  // 管理员或用户获取个人信息
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
  // 管理员添加用户
  async addUser(info) {
    const { account, password, realname, cellphone, address } = info;
    const statement = `INSERT INTO user (account, password, realname, cellphone, address) VALUES (?, ?, ?, ?, ?);`;
    const [result] = await connections.execute(statement, [
      account,
      password,
      realname,
      cellphone,
      address,
    ]);
    return result;
  }
  // 管理员删除用户
  async deleteInfo(userId) {
    const statement = `DELETE FROM user WHERE id = ?;`;
    const [result] = await connections.execute(statement, [userId]);
    return result;
  }
}

module.exports = new UserService();
