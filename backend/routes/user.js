const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const app =express();
app.use(express.json());


// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.userId}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Zod Schemas
const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
});

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

// Auth Routes
router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        });
    }

    const salt = await bcrypt.genSalt(10);
    console.log("=== SIGNUP DEBUG ===");
    // console.log("Signup - Original password:", req.body.password);
    // console.log("Signup - Password type:", typeof req.body.password);
    // console.log("Signup - Password length:", req.body.password.length);
    // console.log("Signup - Password char codes:", Array.from(req.body.password).map(c => c.charCodeAt(0)));
    // console.log("Signup - Username:", req.body.username);
    // console.log("Signup - FirstName:", req.body.firstName);
    // console.log("Signup - LastName:", req.body.lastName);
    
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("Signup - Hashed password:", hashedPassword);
    
    // Test the hash immediately
    const testMatch = await bcrypt.compare(req.body.password, hashedPassword);
    console.log("Signup - Test match with original password:", testMatch);

    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    });
});

router.post("/signin", async (req, res) => {
    console.log("=== SIGNIN REQUEST DEBUG ===");
    console.log("Request body:", req.body);
    // console.log("Request headers:", req.headers);
    // console.log("Content-Type:", req.headers['content-type']);
    
    const { success, error } = signinBody.safeParse(req.body);
    console.log("Zod validation success:", success);
    if (!success) {
        console.log("Zod validation error:", error);
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const user = await User.findOne({
        username: req.body.username
    });

    // console.log("what is the user", user);
    if (user) {
        // Add detailed debugging
        // console.log("Request password:", req.body.password);
        // console.log("Stored password hash:", user.password);
        // console.log("Password hash length:", user.password.length);
        // console.log("Password hash starts with:", user.password.substring(0, 10));
        
        // // Test bcrypt.compare with the exact same password that was used during signup
        // console.log("Testing bcrypt.compare...");
        // console.log("Input password type:", typeof req.body.password);
        // console.log("Input password length:", req.body.password.length);
        // console.log("Input password trimmed:", req.body.password.trim());
        
        // Let's also test if there are any hidden characters
        // console.log("Input password char codes:", Array.from(req.body.password).map(c => c.charCodeAt(0)));
        
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        
        console.log("ismatched or not", isMatch);
        
        // Let's also test with trimmed password
        const isMatchTrimmed = await bcrypt.compare(req.body.password.trim(), user.password);
        console.log("ismatched with trimmed password:", isMatchTrimmed);
        
        if (isMatch) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);

            res.json({
                token: token
            });
            return;
        }
    }

    res.status(411).json({
        message: "Error while logging in"
    });
});

// User Routes
router.get("/me", authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    const account = await Account.findOne({ userId: req.userId });

    if (!user || !account) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        balance: account.balance
    });
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    // If password is being updated, hash it first
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    await User.updateOne(
        { _id: req.userId },  // Correct query filter
        { $set: req.body }    // Correct update syntax
    );

    res.json({
        message: "Updated successfully"
    })
});

router.get("/bulk", authMiddleware, async (req, res) => {
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
});

/*
router.post("/upload-profile-picture", authMiddleware, upload.single('profilePicture'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const profilePicturePath = `uploads/${req.file.filename}`;

    try {
        await User.updateOne({ _id: req.userId }, { profilePicture: profilePicturePath });

        const user = await User.findById(req.userId).select('profilePicture');

        res.json({
            message: "Profile picture uploaded successfully",
            profilePicture: user.profilePicture
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile picture" });
    }
});

*/

// Test route for debugging password issues
router.post("/test-password", async (req, res) => {
    const { username, testPassword } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    // console.log("=== PASSWORD TEST DEBUG ===");
    // console.log("Test password:", testPassword);
    // console.log("Stored hash:", user.password);
    // console.log("Test password char codes:", Array.from(testPassword).map(c => c.charCodeAt(0)));
    
    const isMatch = await bcrypt.compare(testPassword, user.password);
    console.log("Test result:", isMatch);
    
    res.json({
        testPassword,
        storedHash: user.password,
        isMatch,
        originalUsername: user.username
    });
});


module.exports = router;