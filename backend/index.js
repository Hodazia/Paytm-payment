import mainRouter from "./routes/index.js";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

import mongoose from "mongoose";
import createAdmin from "./utils/createAdmin.js";

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

app.listen(PORT, async () => {
    await createAdmin();
    console.log(`we are listening 3000`);
})

/*
run npm start for production, while run npm dev for development
*/
