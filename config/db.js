const { default: mongoose } = require("mongoose");

const dbConnect = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/ems')
        console.log('Connected to Mongo database');
        
    } catch (error) {
        console.log('Error connecting to database');
    }
}

module.exports=dbConnect