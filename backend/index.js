const express = require('express')
const cors = require("cors");
const dbConnect = require('./config/db')
const appRouter = require('./router/index.router');
const isToken = require('./middleware/jwt_decode');
const MCQ = require('./model/mcq.model');
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/',isToken,appRouter)
app.get("/mcq",async(req,res)=>{
    let mcqs = await MCQ.find();
    console.log("mcq", mcqs);
    res.send(mcqs)
    
})
const PORT = process.env.PORT || 8090
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
    dbConnect()
})