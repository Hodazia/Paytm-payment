/*
Now that we have a user account, we need to gate routes which authenticated users can hit.
For this, we need to introduce an auth middleware
 

Create a middleware.js file that  exports an authMiddleware function
Checks the headers for an Authorization header (Bearer <token>)
Verifies that the token is valid
 Puts the userId in the request object if the token checks out.
If not, return a 403 status back to the user

*/

import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";
//const User = require("./db"); 
import userModel from "./models/usermodel.js";


// 🔹 Normal User Authentication
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId; // Store userId in request
        req.isAdmin = decoded.isAdmin || false; // 
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

// 🔹 Admin Authentication Middleware
const adminMiddleware = async (req, res, next) => {
    try {
        // Ensure user is authenticated first
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" });
        }

        // Fetch user from DB
        const user = await userModel.findById(req.userId);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export {
    adminMiddleware,
    authMiddleware
}