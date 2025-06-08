const express = require('express')
const router = express.Router()
const pool = require('../utils/db_config')
const config = require('../utils/config')
const result = require('../utils/result')

router.get('/', (req, res) => {
    const getCategoryQuery = `SELECT * FROM categories` 
    pool.query(getCategoryQuery, (error, data)=>{
        res.send(result.createResult(error, data))
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const getCategoryByIdQuery = `SELECT * FROM categories where id=?` 
    pool.query(getCategoryByIdQuery, [id], (error, data)=>{
        if(data == 0){
            res.send(result.createErrorResult("No any Category is Present"))
        }
        else{ 
            res.send(result.createSuccessResult(data)); 
        }
    })
})

router.post('/add-category', (req, res) => {
    const {title, description} = req.body;
    const insertCategoryQuery = `INSERT INTO categories(title, description) values(?,?)` 
    pool.query(insertCategoryQuery, [title ,description], (error, data)=>{
        res.send(result.createResult(error, data))
    })
})

router.put('/edit-category/:id', (req, res) => {
    const {title, description} = req.body;
    const id = req.params.id
    const insertCategoryQuery = `UPDATE categories SET title=?, description=? WHERE id=?` 
    pool.query(insertCategoryQuery, [title ,description, id], (error, data)=>{
        res.send(result.createResult(error, data))
    })
})

router.delete('/delete-category/:id', (req, res) => {
    const id = req.params.id
    const insertCategoryQuery = `DELETE FROM categories WHERE id=?` 
    pool.query(insertCategoryQuery, [id], (error, data)=>{
        res.send(result.createResult(error, data))
    })
})

module.exports = router
