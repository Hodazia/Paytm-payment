const express = require("express");
const cors = require("cors");

const mainrouter = require("./routes/index")
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/", mainrouter) // every request after api/v1/ shall be handled by the mainrouter from the routes/index.js file

app.listen(3000, () => {
    console.log("we are listening ");
})

