import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialdata={
  title:"",
  author:"",
  content:"", 
  tags:[],
  publishedDate:0
}

const BlogForm = () => {

  const [formdata,setformdata]=useState(initialdata)

  const {title, author, content, tags,publishedDate}=formdata
  const navigate=useNavigate()

  
const handlechange=(e)=>{
  setformdata({...formdata,[e.target.name]:e.target.value})
}


  const handlesubmit=async(e)=>{

    e.preventDefault()
    try {
      await axios.post("http://localhost:2020/blog",formdata)
      alert("Data Added...")
      navigate("/")
    } catch (error) {
      console.log(error)
    }
    
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Add Book Here</h1>
      
      {/* Form */}
      <form 
        className="space-y-4" 
        onSubmit={(e) => handlesubmit(e)}
      >
        {/* Title Input */}
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          name="title" 
          value={title} 
          onChange={(e) => handlechange(e)} 
          type="text" 
          placeholder="Title" 
        />
        
        {/* Author Input */}
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          name="author" 
          value={author} 
          onChange={(e) => handlechange(e)} 
          type="text" 
          placeholder="Author" 
        />
        
        {/* Content Input */}
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          name="content" 
          value={content} 
          onChange={(e) => handlechange(e)} 
          type="text" 
          placeholder="Content" 
        />
        
        {/* Tags Input */}
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          name="tags" 
          value={tags} 
          onChange={(e) => handlechange(e)} 
          type="text" 
          placeholder="Tags" 
        />
        
        {/* Published Date Input */}
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          name="publishedDate" 
          value={publishedDate} 
          onChange={(e) => handlechange(e)} 
          type="date" 
          placeholder="Published Date" 
        />
        
        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-blue-500 transition duration-300"
        >
          ADD
        </button>
      </form>
    </div>
  </div>
  
  )
}

export default BlogForm
