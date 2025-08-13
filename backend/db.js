import mongoose from "mongoose"


const connectDB=async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("database is connected successfully!")
        // await createAdmin(); 
    }
    catch(err){
        console.log(err)
    }
}

// // Create a Schema for Users
// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         minLength: 3,
//         maxLength: 30
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 6
//     },
//     firstName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     },
//     isAdmin: { type: Boolean, default: false } 

// },    { timestamps: true });

// const User = mongoose.model('User', userSchema);

