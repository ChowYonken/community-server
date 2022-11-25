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
  // 查询所有外出人员
  async getOutList(offset, limit) {
    const statement = `
      SELECT
      o.id,
      JSON_OBJECT('id', u.id, 'realname', u.realname, 'cellphone', u.cellphone, 'address', u.address) userInfo,
      o.start, o.end, o.startTime, o.endTime, o.transportation, o.createAt, o.updateAt
      FROM outward o
      LEFT JOIN user u ON u.id = o.user_id
      LIMIT ?, ?;
    `;
    const [result] = await connections.execute(statement, [
      (offset - 1) * limit,
      limit,
    ]);
    return result;
  }
  // 查看外出人员总数
  async getOutTotal() {
    const statement = `
      SELECT
      COUNT(*) as total
      FROM outward;
    `;
    const [result] = await connections.execute(statement);
    return result[0];
  }
  // 根据住户真实姓名查询外出报备
  async getOutByRealname(realname) {
    const statement = `
      SELECT
      o.id,
      JSON_OBJECT('id', u.id, 'realname', u.realname, 'cellphone', u.cellphone, 'address', u.address) userInfo,
      o.start, o.end, o.startTime, o.endTime, o.transportation, o.createAt, o.updateAt
      FROM outward o
      LEFT JOIN user u ON u.id = o.user_id
      WHERE u.realname = ?
    `;
    const [result] = await connections.execute(statement, [realname]);
    return result;
  }
  // 根据指定结束地点的外出报备
  async getOutByEnd(end, offset, limit) {
    const statement = `
      SELECT
      o.id,
      JSON_OBJECT('id', u.id, 'realname', u.realname, 'cellphone', u.cellphone, 'address', u.address) userInfo,
      o.start, o.end, o.startTime, o.endTime, o.transportation, o.createAt, o.updateAt
      FROM outward o
      LEFT JOIN user u ON u.id = o.user_id
      WHERE o.end LIKE ?
      LIMIT ?, ?;
    `;
    const [result] = await connections.execute(statement, [
      `%${end}%`,
      (offset - 1) * limit,
      limit,
    ]);
    return result;
  }
  // 根据时间段查询外出报备
  async getOutByTime(startTime, endTime, offset, limit) {
    const statement = `
      SELECT
      o.id,
      JSON_OBJECT('id', u.id, 'realname', u.realname, 'cellphone', u.cellphone, 'address', u.address) userInfo,
      o.start, o.end, o.startTime, o.endTime, o.transportation, o.createAt, o.updateAt
      FROM outward o
      LEFT JOIN user u ON u.id = o.user_id
      WHERE o.endTime >= ? AND o.endTime <= ?
      LIMIT ?, ?;
    `;
    const [result] = await connections.execute(statement, [
      startTime,
      endTime,
      (offset - 1) * limit,
      limit,
    ]);
    return result;
  }
  // 修改某条外出报备
  async updateOutById(
    start,
    end,
    startTime,
    endTime,
    transportation,
    user_id,
    outId
  ) {
    const statement = `
      UPDATE outward SET start = ?, end = ?, startTime = ?, endTime = ?, transportation = ?, user_id = ? WHERE id = ?;
    `;
    const [result] = await connections.execute(statement, [
      start,
      end,
      startTime,
      endTime,
      transportation,
      user_id,
      outId,
    ]);
    return result;
  }
  // 查询指定id的外出报备
  async getOutById(outId) {
    const statement = `
      SELECT * FROM outward WHERE id = ?;
    `;
    const [result] = await connections.execute(statement, [outId]);
    return result;
  }
  // 删除指定id的外出设备
  async deleteById(outId) {
    const statement = `
      DELETE FROM outward WHERE id = ?;
    `;
    const [result] = await connections.execute(statement, [outId]);
    return result;
  }
  // 查询所有住户的健康信息
  async getHealthList(offset, limit) {
    const statement = `
      SELECT 
      h.id, h.homeTemp, h.status, h.riskAreas, h.healthCode, h.others, 
      JSON_OBJECT('id', u.id, 'realname', u.realname, 'cellphone', u.cellphone, 'address', u.address) userInfo,
      h.createAt createTime
      FROM health h
      LEFT JOIN user u ON u.id = h.user_id
      LIMIT ?, ?;
    `;
    const [result] = await connections.execute(statement, [
      (offset - 1) * limit,
      limit,
    ]);
    return result;
  }
  // 获取住户健康信息总数
  async getHealthTotal() {
    const statement = `
      SELECT
      COUNT(*) as total
      FROM health;
    `;
    const [result] = await connections.execute(statement);
    return result[0];
  }
  // 查询指定id住户的健康信息
  async getHealthById(userId) {
    const statement = `
      SELECT 
      h.id, h.homeTemp, h.status, h.riskAreas, h.healthCode, h.others, 
      JSON_OBJECT('id', u.id, 'realname', u.realname, 'cellphone', u.cellphone, 'address', u.address) userInfo,
      h.createAt createTime
      FROM health h
      LEFT JOIN user u ON u.id = h.user_id
      WHERE h.user_id = ?;
    `;
    const [result] = await connections.execute(statement, [userId]);
    return result;
  }
  // 查询指定高于某温度的住户健康信息
  async getHealthByHomeTemp(offset, limit, homeTemp) {
    const statement = `
      SELECT 
      h.id, h.homeTemp, h.status, h.riskAreas, h.healthCode, h.others, 
      JSON_OBJECT('realname', u.realname, 'cellphone', u.cellphone, 'address', u.address) userInfo,
      h.createAt createTime
      FROM health h
      LEFT JOIN user u ON u.id = h.user_id
      WHERE h.homeTemp >= ?
      LIMIT ?, ?;
    `;
    const [result] = await connections.execute(statement, [
      homeTemp,
      (offset - 1) * limit,
      limit,
    ]);
    return result;
  }
  // 查询根据健康码颜色的住户健康信息
  async getHealthByHealthCode(offset, limit, healthCode) {
    const statement = `
      SELECT 
      h.id, h.homeTemp, h.status, h.riskAreas, h.healthCode, h.others, 
      JSON_OBJECT('realname', u.realname, 'cellphone', u.cellphone, 'address', u.address) userInfo,
      h.createAt createTime
      FROM health h
      LEFT JOIN user u ON u.id = h.user_id
      WHERE h.healthCode = ?
      LIMIT ?, ?;
    `;
    const [result] = await connections.execute(statement, [
      healthCode,
      (offset - 1) * limit,
      limit,
    ]);
    return result;
  }
  // 查询指定时间段的健康信息
  async getHealthByTime(offset, limit, startTime, endTime) {
    const statement = `
      SELECT 
      h.id, h.homeTemp, h.status, h.riskAreas, h.healthCode, h.others, 
      JSON_OBJECT('realname', u.realname, 'cellphone', u.cellphone, 'address', u.address) userInfo,
      h.createAt createTime
      FROM health h
      LEFT JOIN user u ON u.id = h.user_id
      WHERE h.createAt >= ? AND h.createAt <= ?
      LIMIT ?, ?;
    `;
    const [result] = await connections.execute(statement, [
      startTime,
      endTime,
      (offset - 1) * limit,
      limit,
    ]);
    return result;
  }
  // 修改某条健康信息
  async updateHealth(
    homeTemp,
    status,
    riskAreas,
    healthCode,
    others,
    healthId
  ) {
    const statement = `
      UPDATE health SET homeTemp=?, status=?, riskAreas=?, healthCode=?, others=? WHERE id = ?;
    `;
    const [result] = await connections.execute(statement, [
      homeTemp,
      status,
      riskAreas,
      healthCode,
      others,
      healthId,
    ]);
    return result;
  }
  // 删除某条健康信息
  async deleteHealth(healthId) {
    const statement = `
      DELETE FROM health WHERE id=?;
    `;
    const [result] = await connections.execute(statement, [healthId]);
    return result;
  }
}

module.exports = new AdminService();
