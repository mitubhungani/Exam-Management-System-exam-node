const { Router } = require("express");
const adminControllers = require('../controller/admin.controller');
const { role } = require("../middleware/role");
// const role = require("../middleware/role");

const adminRouter = Router()

adminRouter.get('/',adminControllers.getAdmins)


module.exports = adminRouter