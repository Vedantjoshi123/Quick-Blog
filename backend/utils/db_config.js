const mysql2 = require('mysql2');

const pool = mysql2.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Pass@123',
  database: process.env.DB_NAME || 'quick_blog_app'
});

module.exports = pool;
