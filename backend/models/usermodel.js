import mongoose from "mongoose";

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    profileurl:{
        type:String,
        required:true
    },
      // unique QR id for payments
  qrCodeId: { type: String, unique: true },

  // store qrData as JSON string (e.g. {"qrCodeId": "..."} )
  qrData: { type: String },
    isAdmin: { type: Boolean, default: false } 

},    { timestamps: true });


const userModel = mongoose.model("User",userSchema);

export default userModel