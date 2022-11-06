const connections = require("../app/database");

class AdminService {
  // 新增公告
  async addNotice(title, content, priority) {
    const statement = `
    INSERT INTO notice (title, content, priority) VALUES (?, ?, ?);
    `;
    const [result] = await connections.execute(statement, [
      title,
      content,
      priority,
    ]);
    return result;
  }
  // 修改公告
  async updateNotice(title, content, priority, noticeId) {
    const statement = `
      UPDATE notice SET title = ?, content = ?, priority = ? WHERE id = ?;
    `;
    const [result] = await connections.execute(statement, [
      title,
      content,
      priority,
      noticeId,
    ]);
    return result;
  }
  // 删除公告
  async deleteNotice(noticeId) {
    const statement = `
      DELETE FROM notice WHERE id = ?;
    `;
    const [result] = await connections.execute(statement, [noticeId]);
    return result;
  }
  // 根据id查询某条公告
  async getNoticeById(noticeId) {
    const statement = `
      SELECT * FROM notice WHERE id = ?;
    `;
    const [result] = await connections.execute(statement, [noticeId]);
    return result;
  }
}

module.exports = new AdminService();
