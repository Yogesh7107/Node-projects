const express = require("express")
const router = express.Router()
const { getBook, postBook, deleteBook, editBook } = require('../Controllers/book-controllers')



router.get('/', getBook)
router.post('/', postBook)
router.delete('/:id', deleteBook)
router.put('/:id', editBook)

module.exports = router;