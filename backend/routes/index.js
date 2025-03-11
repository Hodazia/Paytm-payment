const express= require("express");
const userrouter = require("./user");
const authMiddleware = require("../middleware")
const accountRouter = require("./account"); 

const mainrouter = express.Router();

mainrouter.use("/user",userrouter);
mainrouter.use("/account",accountRouter);


module.exports= mainrouter;