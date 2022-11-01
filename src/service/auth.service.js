const connection = require("../app/database");

class AuthService {
  async checkResource(tableName, userId, account) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND account = ?;`;
    const [result] = await connection.execute(statement, [userId, account]);
    return result.length === 0 ? false : true;
  }
}

module.exports = new AuthService();
