const {Router} =require('express');
const examController =require('../controller/exam.controller');
const mcqController = require('../controller/mcq.controller')
const { teacherRole } = require('../middleware/role');

const examRouter = Router()
examRouter.get('/mcqs',mcqController.getMcqs)

examRouter.get('/',examController.getExams)
examRouter.get('/:id',examController.getExamById)
examRouter.post('/addexam',teacherRole,examController.createExam)
examRouter.patch('/editexamtpic/:id',teacherRole,examController.updateExam)
examRouter.delete('/deleteexam/:id',teacherRole,examController.deleteExam)

examRouter.post('/addmcq',teacherRole,mcqController.createMcq)
examRouter.get('/mcq/:id',mcqController.getMcqByExamId)



module.exports = examRouter;