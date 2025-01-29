const {Router} =require('express');
const examController =require('../controller/exam.controller');
const mcqController = require('../controller/mcq.controller')
const { teacherRole } = require('../middleware/role');

const examRouter = Router()
examRouter.get('/mcqs',mcqController.getMcqs)

examRouter.get('/',examController.getExams)
examRouter.get('/:examid',examController.getExamById)
examRouter.post('/addexam',teacherRole,examController.createExam)
examRouter.patch('/editexamtpic/:examid',teacherRole,examController.updateExam)
examRouter.delete('/deleteexam/:examid',teacherRole,examController.deleteExam)
// examRouter.get('/exammcqids/:examid',examController.examMcqIds)

examRouter.post('/addmcq',teacherRole,mcqController.createMcq)
examRouter.get('/mcq/:id',mcqController.getMcqByExamId)
examRouter.get('/mcqs',mcqController.getMcqs)




module.exports = examRouter;