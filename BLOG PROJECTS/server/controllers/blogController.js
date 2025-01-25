const BlogModel = require("../models/blog");


const GetAllData=async (req, res) => {
  let Blog;
  try {
    Blog = await BlogModel.find(); 
  } catch (err) {
    console.log(err);
  }

  if (!Blog) {
    return res.status(404).json({ message: "No Blogs found" });
  }
  return res.status(200).json(Blog);
  }

const AddData=async (req, res) => {
    const { title, author, content, tags,publishedDate  } = req.body;
    let Blog;
  try {
    Blog=await BlogModel.create({  title, author, content, tags,publishedDate });
  } catch (error) {
    console.log(error);
  }

  if(!Blog)
  {
    res.status(400).json({message:"Can't Add Blog Details"})
  }
  else
  {
    res.status(200).json({message:"Blog Created Successfully"})
  }
}

const DeleteData=async (req, res) => {
    const { _id } = req.params;
    let Blog
    try {
      Blog=await BlogModel.findByIdAndDelete(_id);
    } catch (error) {
      console.log(error)
    }

    if(!Blog)
    {
      res.status(400).json({message:"Can't Delete Blog Details"})
    }
    else
    {
      res.status(200).json({message:"Blog Data Deleted..."})
    }
  }

const UpadetData=async (req, res) => {
    const { _id } = req.params;
    const {  title, author, content, tags,publishedDate } = req.body;
    let Blog
    try {
      Blog=await BlogModel.findByIdAndUpdate(_id, {  title, author, content, tags,publishedDate });
    
    } catch (error) {
      console.log(error)
    }

    if(!Blog)
    {
      res.status(400).json({message:"Can't Update Blog Details"})
    }
    else
    {
      res.status(200).json({message:"Blog Data Updated..."})
    }
  }

  
const GetSingleData=async(req, res) => {
  const {_id} = req.params
  let Blog
  try {
    Blog = await BlogModel.findById(_id);
  } catch (err) {
    console.log(err);
  }

  if (!Blog) {
    return res.status(400).json({ message: "No Blog found" });
  }
  return res.status(200).json(Blog);
  }

module.exports={GetSingleData,UpadetData,DeleteData,AddData,GetAllData}