const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.db_host,
  port: process.env.db_port,
  user: process.env.db_username,
  database: process.env.db_database,
  password: process.env.db_password,
  connectionLimit: 10,
});

const getLoginData = async (userId) => {
  const SQL = `
      SELECT id, salt, password
      FROM user
      WHERE email = ?`;

  const conn = await pool.getConnection();
  const [userRows] = await conn.query(SQL, [userId]);
  await conn.release();
  return userRows;
};

module.exports = {
  getLoginData,
};
