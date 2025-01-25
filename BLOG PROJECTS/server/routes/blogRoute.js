const express = require('express');
const { GetAllData, AddData, DeleteData, UpadetData, GetSingleData } = require('../controllers/blogController');
const BlogRouter = express.Router();

BlogRouter.get("/",GetAllData)
BlogRouter.post("/",AddData)
BlogRouter.delete("/:_id",DeleteData)
BlogRouter.patch("/:_id",UpadetData)
BlogRouter.get("/:_id",GetSingleData)

module.exports=BlogRouter