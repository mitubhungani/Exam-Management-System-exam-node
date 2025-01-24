const mongoose = require('mongoose');
const Admin = require('./admin.model');
const MCQ = require('./mcq.model');

const examSchema = new mongoose.Schema({
    name:String,
    totalmarks:Number,
    teacherId:{type:mongoose.Schema.Types.ObjectId,ref:Admin},
    mcqIds:[{type:mongoose.Schema.Types.ObjectId,ref:MCQ}]
},{timestamps:true})

const Exam = mongoose.model('Exam',examSchema)

module.exports = Exam;