const mongoose = require("mongoose")

const blogSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      tags: {
        type: [String],
        required: true,
      },
      publishedDate: {
        type: Date,
        required: true,
      }})

const BlogModel=mongoose.model("blogdtail",blogSchema)

module.exports=BlogModel