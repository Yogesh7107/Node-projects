import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const initialdata={
  title:"",
  author:"",
  content:"", 
  tags:[],
  publishedDate:0
}

const Editblog = () => {
    const {_id}=useParams()
    const [formdata,setformdata]=useState(initialdata)
    const {title, author, content, tags,publishedDate}=formdata
    const navigate=useNavigate()

    const handlechange=(e)=>{
      setformdata({...formdata,[e.target.name]:e.target.value})
    }

    const handlesubmit=async(e)=>{
      e.preventDefault()
      
      try {
      let res=  await axios.patch(`http://localhost:2020/blog/${_id}`,formdata)
      console.log(res)
        alert("Data Updated....")
        navigate("/")
      } catch (error) {
        console.log(error)
      }
    
    }
    
    const getdata=()=>{
        axios.get(`http://localhost:2020/blog/${_id}`)
        .then((res)=>{
            console.log(res.data)
            setformdata(res.data)
        })
        .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        getdata()
    },[])

  return (
    <div style={{marginLeft:"33%"}}>
      <h1 style={{marginLeft:"10%",fontFamily:"sans-serif"}}>Edit Book Here</h1>
      <div>
      <form action="" style={{borderRadius:"10px",width:"40%",padding:"20px",boxShadow:"10px 10px 20px grey"}} onSubmit={(e)=>handlesubmit(e)}>
      <input style={{width:"94%",padding:"10px"}} name='title' value={title} onChange={(e)=>handlechange(e)} type="text" placeholder='Title' /><br /><br></br>
        <input style={{width:"94%",padding:"10px"}} name='author' value={author} onChange={(e)=>handlechange(e)} type="text" placeholder='Author' /><br /><br></br>
        <input style={{width:"94%",padding:"10px"}} name='content' value={content} onChange={(e)=>handlechange(e)} type="text" placeholder='Content' /><br /><br></br>
        <input style={{width:"94%",padding:"10px"}} name='tags' value={tags} onChange={(e)=>handlechange(e)} type="text" placeholder='Tags' /><br /><br></br>
        <input style={{width:"94%",padding:"10px"}} name='publishedDate' value={publishedDate} onChange={(e)=>handlechange(e)} type="Date" placeholder='Published-Date' /><br /><br></br>
        <button type='submit' style={{marginLeft:"0%",border:"none",backgroundColor:"black",color:"white",padding:"10px 180px 10px 200px"}}>EDIT</button>
      </form>
      </div>
    </div>
  )
}

export default Editblog
