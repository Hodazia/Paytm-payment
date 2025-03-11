const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");


const mainrouter = require("./routes/index")
const app = express();


app.use("/api/v1/", mainrouter) // every request after api/v1/ shall be handled by the mainrouter from the routes/index.js file

app.listen(3000, () => {
    console.log("we are listening ");
})

