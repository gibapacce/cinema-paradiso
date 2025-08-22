const db = require("../config/database");

class BaseRepository {
  constructor(tableName) {
    this.table = tableName;
  }

  async findAll() {
    const [rows] = await db.execute(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(data) {
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");
    const values = Object.values(data);

    const [result] = await db.execute(
      `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`,
      values
    );

    return await this.findById(result.insertId);
  }
}

module.exports = BaseRepository;
