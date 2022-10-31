const connections = require("../app/database");

class UserService {
  // 用户注册
  async create(user) {
    const { account, password } = user;
    const statement = `INSERT INTO login (account, password) VALUES (?, ?);`;
    const [result] = await connections.execute(statement, [account, password]);
    return result;
  }
  // 根据用户账号判断用户是否已注册
  async getUserByAccount(account) {
    const statement = `SELECT * FROM login WHERE account = ?;`;
    const [result] = await connections.execute(statement, [account]);
    return result;
  }
}

module.exports = new UserService();
