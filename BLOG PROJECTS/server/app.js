const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const BlogRouter = require('./routes/blogRoute');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/blog",BlogRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Db")
        console.log(`server running on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
    
})
