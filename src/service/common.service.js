const connections = require("../app/database");

class CommonService {
  // 查询所有菜单
  async getMenuList() {
    const statement = `SELECT * FROM menu;`;
    const [result] = await connections.execute(statement);
    return result;
  }
  async getMenuByRole(roleId) {
    const statement = `
      SELECT 
      m.id, m.name, m.type, m.url, m.icon, m.parent_id
      FROM role r
      LEFT JOIN role_menu rm ON rm.role_id = r.id
      LEFT JOIN menu m ON m.id = rm.menu_id
      WHERE r.id = ?;
    `;
    const [result] = await connections.execute(statement, [roleId]);
    return result;
  }
  async getNoticeList(offset, limit) {
    const statement = `
      SELECT
      *
      FROM notice
      LIMIT 0, 10;
    `;
    const [result] = await connections.execute(statement, [offset, limit]);
    return result;
  }
  // 查询最新公告
  async getNewNotice() {
    const statement = `
      SELECT
      *
      FROM notice
      WHERE createAt=(SELECT max(createAt) FROM notice);
    `;
    const [result] = await connections.execute(statement);
    return result[0];
  }
  // 查询红绿黄码数量
  async gethealthCodeCounts() {
    const statement = `
      SELECT 
      healthCode, COUNT(*) counts 
      FROM health 
      GROUP BY healthCode;
    `;
    const [result] = await connections.execute(statement);
    return result;
  }
  // 获取公告总数
  async getNoticeTotal() {
    const statement = `
      SELECT
      COUNT(*) as total
      FROM notice;
    `;
    const [result] = await connections.execute(statement);
    return result[0];
  }
}

module.exports = new CommonService();
