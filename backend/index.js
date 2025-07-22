const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mainRouter = require("./routes/index")
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000; 

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB);
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}

connectDB();
app.use("/api/v1/", mainRouter); // every request after api/v1/ shall be handled by the mainrouter from the routes/index.js file

app.listen(PORT, () => {
    console.log(`we are listening 3000`);
})

/*
run npm start for production, while run npm dev for development
*/
