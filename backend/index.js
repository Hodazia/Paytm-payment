const express = require("express");
const cors = require("cors");

const mainRouter = require("./routes/index")
const app = express();

app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');

const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://zia23hoda:ziaulhoda@cluster0.kpu02.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}

connectDB();
app.use("/api/v1/", mainRouter); // every request after api/v1/ shall be handled by the mainrouter from the routes/index.js file

app.listen(3000, () => {
    console.log(`we are listening 3000`);
})

