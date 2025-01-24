const { default: mongoose } = require("mongoose");
require("dotenv").config();

const URL = process.env.DB_URL

const dbConnect = async()=>{
    try {
        await mongoose.connect(URL)
        console.log('Connected to Mongo database');
        
    } catch (error) {
        console.log('Error connecting to database');
    }
}

module.exports=dbConnect