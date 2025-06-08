const express = require('express')
const router = express.Router()
const pool = require('../utils/db_config')
const result = require('../utils/result')
const multer = require('multer')
const upload = multer({ dest: 'images' })

router.get('/search', (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.send(result.createErrorResult("Missing search query"));
  }

  const search = `%${searchTerm.trim().toLowerCase()}%`;

  const sql = `
    SELECT 
      b.id AS blogId,
      b.title AS title,
      b.content,
      b.image,
      b.createdAt,

      u.id AS authorId,
      u.uname AS authorName,
      u.email AS authorEmail,

      c.id AS categoryId,
      c.title AS categoryTitle

    FROM blogs b
    JOIN users u ON b.authorId = u.id
    LEFT JOIN categories c ON b.categoryId = c.id
    WHERE LOWER(b.title) LIKE ? OR LOWER(b.content) LIKE ?
    ORDER BY b.createdAt DESC
  `;

  pool.query(sql, [search, search], (error, data) => {
    res.send(result.createResult(error, data));
  });
});


router.get('/', (req, res) => {
    const getBlogQuery = `SELECT 
        b.id AS blogId,
        b.title AS title,
        b.content,
        b.image,
        b.createdAt,

        u.id AS authorId,
        u.uname AS authorName,
        u.email AS authorEmail,

        c.id AS categoryId,
        c.title AS categoryTitle

        FROM blogs b
        JOIN users u ON b.authorId = u.id
        LEFT JOIN categories c ON b.categoryId = c.id
        ORDER BY b.createdAt DESC
        ` 
    pool.query(getBlogQuery, (error, body)=>{
        res.send(result.createResult(error, body))
    })
})

router.get('/myblogs', (req, res) => {
    const authorId = req.headers.id;
    const getMyBlogQuery = `SELECT * FROM blogs where authorId=?` 
    pool.query(getMyBlogQuery, [authorId], (error, data)=>{
        res.send(result.createResult(error, data));
    })
})

router.get('/:id', (req, res)=>{
    const blogId = req.params.id;
    const getMyBlogQuery = `SELECT 
    b.id AS blogId,
    b.title AS title,
    b.content,
    b.image,
    b.createdAt,
    b.updatedAt,
    u.id AS authorId,
    u.uname AS authorName,
    u.email AS authorEmail,
    b.categoryId
FROM 
    blogs b
JOIN 
    users u ON b.authorId = u.id
WHERE 
    b.id = ?;
`
    pool.query(getMyBlogQuery, [blogId], (error, data)=>{
        res.send(result.createResult(error, data))
    })
})

router.post('/addblog', upload.single('image'), (req, res)=>{
    const {title, content, categoryId} = req.body
    const authorId = req.headers.id;
    const addBlogQuery = `Insert into blogs(title, content, categoryId, authorId, image) values(?, ?, ?, ?, ?)`
    pool.query(addBlogQuery,[title, content, categoryId, authorId, req.file.filename], (error, data)=>{
      res.send(result.createResult(error, data))
    })
})


router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    const getMyBlogQuery = `DELETE FROM blogs where id=?` 
    pool.query(getMyBlogQuery, [id], (error, data)=>{
        res.send(result.createResult(error, data))
    })
})

router.put('/update/:id', upload.single('image'), (req, res) => {
    const { title, content, categoryId } = req.body;
    const id = req.params.id;
  
    let query, params;
  
    if (req.file) {
      // User uploaded new image
      query = `UPDATE blogs SET title=?, content=?, categoryId=?, image=? WHERE id=?`;
      params = [title, content, categoryId, req.file.filename, id];
    } else {
      // No new image uploaded — keep existing one
      query = `UPDATE blogs SET title=?, content=?, categoryId=? WHERE id=?`;
      params = [title, content, categoryId, id];
    }
  
    pool.query(query, params, (error, data) => {
      res.send(result.createResult(error, data));
    });
  });
  

router.get('/category/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    const query = `SELECT b.*, u.uname AS authorName, u.email AS authorEmail
      FROM blogs b
      JOIN users u ON b.authorId = u.id
      WHERE b.categoryId = ?
      ORDER BY b.createdAt DESC`;
    pool.query(query, [categoryId], (error, results) => {
      res.send(result.createResult(error, results));
    });
  });


  
  
  
module.exports = router
