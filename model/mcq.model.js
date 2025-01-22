const mongoose = require('mongoose');
const Exam = require('./exam.model');
const Admin = require('./admin.model');

const mcqSchema = new mongoose.Schema({
    title:String,
    options:[String],
    ans:String,
    marks:Number,
},{timestamps:true})

const MCQ = mongoose.model('MCQ',mcqSchema)

module.exports = MCQ;