const express = require('express')
const dbConnect = require('./config/db')
const appRouter = require('./router/index.router')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/',appRouter)

const PORT = process.env.PORT || 8090
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
    dbConnect()
})