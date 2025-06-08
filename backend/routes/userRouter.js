const express = require("express");
const pool = require("../utils/db_config");
const result = require("../utils/result");
const config = require("../utils/config");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", (req, res) => {
  const { uname, email, password } = req.body;
  const encryptedPass = String(cryptoJs.SHA256(password));
  const insertQuery = `INSERT INTO users(uname, email, password) VALUES(?, ?, ?)`;
  pool.query(insertQuery, [uname, email, encryptedPass], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;  
  
  const encryptedPass = String(cryptoJs.SHA256(password));
  const sql = `SELECT * FROM users WHERE email=? and password=?`;
  pool.query(sql, [email, encryptedPass], (error, data) => {
    if (data) {
      if (data.length == 0) {   
        res.send(result.createErrorResult("Invalid email or password"));
      } else {   
        const payload = {
          id: data[0].id,        
        };
        const token = jwt.sign(payload, config.secretKey);     
        const body = {    
          token: token,
          userName: data[0].uname,
          userEmail: data[0].email,
        };
        res.send(result.createSuccessResult(body)); 
      }
    } else {
      res.send(result.createErrorResult(error));
    }
  });
});

router.get("/profile", (req, res) =>{
  const userId = req.headers.id;
  const sql = `select * from users where id = ?`;
  pool.query(sql, [userId], (error, data) => {
    res.send(result.createResult(error, data));
  });
})


router.put("/profile", (req, res) => {
  const { uname } = req.body;
  const userId = req.headers.id;  // Getting user id from the authenticated token
  const sql = `UPDATE users SET uname=? WHERE id=?`;

  pool.query(sql, [uname, userId], (error, data) => {
    res.send(result.createResult(error, data));
  });
});




module.exports = router;
