const connections = require("../app/database");

class UserService {
  // 用户注册
  async create(user) {
    const { account, password } = user;
    const statement = `INSERT INTO user (account, password) VALUES (?, ?);`;
    const [result] = await connections.execute(statement, [account, password]);
    // 默认分配为住户
    const { insertId } = result;
    const statement1 = `INSERT INTO user_role (user_id, role_id) VALUES (?, ?);`;
    await connections.execute(statement1, [insertId, 2]);
    return result;
  }
  // 根据id查看用户密码
  async getPwdById(id) {
    const statement = `
      SELECT
      password
      FROM user
      WHERE id = ?;
    `;
    const [result] = await connections.execute(statement, [id]);
    return result[0];
  }
  // 根据用户账号判断用户是否已注册
  async getUserByAccount(account) {
    const statement = `SELECT * FROM user WHERE account = ?;`;
    const [result] = await connections.execute(statement, [account]);
    return result;
  }
  // 判断地址是否存在(除了用户自己，需要使用userId)
  async checkAddressById(address, userId) {
    const statement = `SELECT * FROM user WHERE address = ? AND id != ?;`;
    const [result] = await connections.execute(statement, [address, userId]);
    return result.length === 0 ? false : true;
  }
  // 判断地址是否存在（判断所有用户，不需要使用userId）
  async checkAddress(address) {
    const statement = `SELECT * FROM user WHERE address = ?;`;
    const [result] = await connections.execute(statement, [address]);
    return result.length === 0 ? false : true;
  }
  // 修改密码
  async updatePassword(newPwd, id) {
    const statement = `
    UPDATE user SET password = ? WHERE id = ?;
    `;
    await connections.execute(statement, [newPwd, id]);
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
    return result[0];
  }
  // 管理员获取用户列表
  async getUserList(offset, limit) {
    const statement = `SELECT 
                       u.id, u.account, u.realname, u.cellphone, u.address, u.suspected,
                       JSON_OBJECT("id", r.id, "name", r.name, "createTime", r.createAt, "updateTime", r.updateAt) role,
                       u.createAt createTime, u.updateAt updateTime
                       FROM user u
                       LEFT JOIN user_role ur ON ur.user_id = u.id
                       LEFT JOIN role r ON r.id = ur.role_id
                       LIMIT ?, ?;`;
    const [result] = await connections.execute(statement, [
      (offset - 1) * limit,
      limit,
    ]);
    return result;
  }
  // 获取用户总数
  async getUserTotal(realname, address) {
    let statement = ``;
    let result = [];
    if (!realname && !address) {
      statement = `
        SELECT
        COUNT(*) as total
        FROM user;
      `;
      [result] = await connections.execute(statement);
    } else if (realname && address) {
      statement = `
        SELECT
        COUNT(*) as total
        FROM user
        WHERE realname LIKE ? AND address LIKE ?;
      `;
      [result] = await connections.execute(statement, [
        `%${realname}%`,
        `%${address}%`,
      ]);
    } else if (realname && !address) {
      statement = `
        SELECT
        COUNT(*) as total
        FROM user
        WHERE realname LIKE ?;
      `;
      [result] = await connections.execute(statement, [`%${realname}%`]);
    } else if (!realname && address) {
      statement = `
        SELECT
        COUNT(*) as total
        FROM user
        WHERE address LIKE ?;
      `;
      [result] = await connections.execute(statement, [`%${address}%`]);
    }
    return result[0];
  }
  // 管理员根据真实姓名或地址查询用户
  async queryByRealnameOrAddress(realname, address, offset, limit) {
    const statement = `
      SELECT
      u.id, u.account, u.realname, u.cellphone, u.address, u.suspected, 
      JSON_OBJECT("id", r.id, "name", r.name, "createTime", r.createAt, "updateTime", r.updateAt) role,
      u.createAt createTime, u.updateAt updateTime
      FROM user u
      LEFT JOIN user_role ur ON ur.user_id = u.id
      LEFT JOIN role r ON r.id = ur.role_id
      WHERE realname LIKE ? AND address LIKE ?
      LIMIT ?, ?;
    `;
    const [result] = await connections.execute(statement, [
      `%${realname}%`,
      `%${address}%`,
      (offset - 1) * limit,
      limit,
    ]);
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
    // 默认分配为住户
    const { insertId } = result;
    const statement1 = `INSERT INTO user_role (user_id, role_id) VALUES (?, ?);`;
    await connections.execute(statement1, [insertId, 2]);
    return result;
  }
  // 管理员删除用户
  async deleteInfo(userId) {
    const statement = `DELETE FROM user WHERE id = ?;`;
    const [result] = await connections.execute(statement, [userId]);
    return result;
  }
  // 管理员设疑似人员
  async isSuspected(mode, userId) {
    const statement = `UPDATE user SET suspected = ? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [mode, userId]);
    return result;
  }
  // 管理员查询疑似人员列表
  async suspectedList(offset, limit) {
    const statement = `
      SELECT id, account, realname, cellphone, address, suspected 
      FROM user 
      WHERE suspected = 1
      LIMIT ?, ?;`;
    const [result] = await connections.execute(statement, [
      (offset - 1) * limit,
      limit,
    ]);
    return result;
  }
  // 查看疑似人员总数
  async getSuspectedTotal() {
    const statement = `
      SELECT
      COUNT(*) as total
      FROM user
      WHERE suspected = 1;
    `;
    const [result] = await connections.execute(statement);
    return result[0];
  }
  // 用户查询普通或紧急公告
  async getNoticeByPriority(offset, limit, priority, timeStart, timeEnd) {
    let statement = ``;
    let result = [];
    if (priority && timeStart) {
      statement = `
        SELECT
        *
        FROM notice
        WHERE  (createAt >= ? AND createAt <= ?) AND priority = ?
        LIMIT ?, ?;
      `;
      [result] = await connections.execute(statement, [
        timeStart,
        timeEnd,
        priority,
        (offset - 1) * limit,
        limit,
      ]);
    } else if (priority && timeStart === "") {
      statement = `
        SELECT
        *
        FROM notice
        WHERE priority = ?
        LIMIT ?, ?;
      `;
      [result] = await connections.execute(statement, [
        priority,
        (offset - 1) * limit,
        limit,
      ]);
    } else if (priority === "" && timeStart) {
      statement = `
        SELECT
        *
        FROM notice
        WHERE createAt >= ? AND createAt <= ?
        LIMIT ?, ?;
      `;
      [result] = await connections.execute(statement, [
        timeStart,
        timeEnd,
        (offset - 1) * limit,
        limit,
      ]);
    }

    return result;
  }
  // 用户外出报备
  async addOut(start, end, startTime, endTime, transportation, id) {
    const statement = `
      INSERT INTO outward (start, end, startTime, endTime, transportation, user_id) VALUES (?, ?, ?, ?, ?, ?);
    `;
    const [result] = await connections.execute(statement, [
      start,
      end,
      startTime,
      endTime,
      transportation,
      id,
    ]);
    return result;
  }
  // 用户健康申报
  async addHealth(homeTemp, status, riskAreas, healthCode, others, id) {
    const statement = `
      INSERT INTO health (homeTemp, status, riskAreas, healthCode, others, user_id) VALUES (?, ?, ?, ?, ?, ?);
    `;
    const [result] = await connections.execute(statement, [
      homeTemp,
      status,
      riskAreas,
      healthCode,
      others,
      id,
    ]);
    return result;
  }
}

module.exports = new UserService();
