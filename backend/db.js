const mongoose = require("mongoose");

// connect to a db
mongoose.connect(`${process.env.MONGODB_URL}`);

// userSchema for login, username/email , password, name
const userSchema = new mongoose.Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    username: {type:String, required: true},
    password: {type:String, required: true},
});

// 
const User = mongoose.model("user",userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User
}


