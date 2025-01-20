const { Router } = require("express");
const adminControllers = require('../controller/admin.controller')

const adminRouter = Router()

adminRouter.get('/',adminControllers.getAdmins)
adminRouter.post('/signup',adminControllers.createAdmin)
adminRouter.post('/login',adminControllers.loginAdmin)

module.exports = adminRouter