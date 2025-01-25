import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Bloglist from '../components/Bloglist'
import BlogForm from '../components/BlogForm'
import Editblog from '../components/Editblog'

const Allroutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Bloglist />}></Route>
        <Route path='/addbook' element={<BlogForm />}></Route>
        <Route path='/editbook/:_id' element={<Editblog />}></Route>
    </Routes>
  )
}

export default Allroutes
