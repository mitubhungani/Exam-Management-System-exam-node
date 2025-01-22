const Exam = require("../model/exam.model");

exports.createExam = async (req, res) => {
  try {
    req.body.teacherId = req.user.id;
    let exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getExams = async (req, res) => {
  try {
    let exam = await Exam.find();
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getExamById = async (req, res) => {
  try {
    let {id} = req.params
    let exam = await Exam.findById(id).populate("mcqIds");
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.updateExam = async (req, res) => {
  try {
    let {id} = req.params
    console.log("id",id);
    let exam = await Exam.findByIdAndUpdate(id, req.body, {new: true});
    res.status(201).json(exam);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.deleteExam = async (req, res) => {
  try {
    let {id} = req.params
    let exam = await Exam.findByIdAndDelete(id);
    res.status(201).json(exam);  
  } catch (error) {
    res.status(500).send(error.message);
  }
}