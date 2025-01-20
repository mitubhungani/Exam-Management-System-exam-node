const { Router } = require("express");
const adminRouter = require("./admin.router");

const appRouter = Router()

appRouter.use('/admin',adminRouter)

module.exports = appRouter;