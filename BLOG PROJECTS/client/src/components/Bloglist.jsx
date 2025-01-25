import axios from 'axios';
import '../App.css';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Blogdetails from './Blogdetails';

const Bloglist = () => {
    const [books, setBooks] = useState([]);

    const FetchData = () => {
        axios
          .get("http://localhost:2020/blog")
          .then((res) => {
            setBooks(res.data);
          })
          .catch((err) => console.log(err));
      };
 
      useEffect(() => {
        FetchData();
      }, []);

      const handledelete = (_id) => {
        axios
          .delete(`http://localhost:2020/blog/${_id}`)
          .then((res) => {
            console.log(res.data);
            FetchData();
          })
          .catch((err) => console.log(err));
      };
  return (
    <div>
      <h1 style={{textAlign:"center"}}>BLOG DETAILS</h1>
        <div className='grid' >
        {books.map((el) => (
          <div key={el._id} style={{boxShadow:"10px 10px 20px grey",padding:"20px",borderRadius:"10px"}}>
            <Blogdetails title={el.title} author={el.author} content={el.content} tags={el.tags} publishedDate={el.publishedDate}/>
            
            <button className="btn" onClick={()=>handledelete(el._id)}>Delete</button>
            <button className="btn">
                <Link
                  to={`/editbook/${el._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Edit
                </Link>
              </button>
          
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bloglist


// style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px",textAlign:"center",width:"90%",margin:"auto"}}