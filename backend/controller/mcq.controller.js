const Exam = require("../model/exam.model");
const MCQ = require("../model/mcq.model");

exports.createMcq = async (req, res) => {
  try {
    let mcq = await MCQ.create(req.body);
    let exam = await Exam.findById(req.body.exam);
    console.log('exam',exam);
    exam.mcqIds.push(mcq._id);
    await exam.save();
    res.status(201).json(mcq);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getMcqByExamId = async (req, res) => {
  try {
    let {id} = req.params
    let mcqs = await MCQ.findById(id);
    res.status(200).json(mcqs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getMcqs = async (req, res) => {
  try {
    let mcqs = await MCQ.find();
    console.log("mcq", mcqs);
    
    res.status(200).json(mcqs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
