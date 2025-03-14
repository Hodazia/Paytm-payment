const express = require("express");
const zod = require("zod");
const { User,Account} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const {authMiddleware} = require("../middleware")

const userrouter = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

userrouter.post("/signup" , async (req,res) => {
    const body = req.body;
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user_id = User.findOne({
        username: body.username
    })

    if(!user_id)
    {
        return res.json({message: "incorrect inputs"})
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

// create a zod validation schema for signin 
const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

userrouter.post("/signin", async (req,res) => {

    const success= signinBody.safeParse(req.body);
    if(!success)
    {
        return res.status(411).json({message:"Invalid credentials"})
    }
    const finduserid = await User.find({username});
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

// other auth routes

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

userrouter.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})


userrouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = userrouter;