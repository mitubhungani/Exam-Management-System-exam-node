const { Router } = require("express");
const adminRouter = require("./admin.router");
const adminControllers = require('../controller/admin.controller');
const examRouter = require("./exam.router");
const role = require("../middleware/role");
// const mcqRouter = require("./mcq.router");

const appRouter = Router()

appRouter.use('/admin',adminRouter)
appRouter.use('/exam',examRouter)
// appRouter.use('/mcq',mcqRouter)

appRouter.post('/signup',adminControllers.createAdmin)
appRouter.post('/login',adminControllers.loginAdmin)

module.exports = appRouter;