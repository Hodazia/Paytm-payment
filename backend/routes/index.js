const express= require("express");
const router = require("./user");
const authMiddleware = require("../middleware")

const mainrouter = express.Router();

mainrouter.use("/user",router);

module.exports= mainrouter;