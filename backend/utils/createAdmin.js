// utils/createAdmin.js
import bcrypt from "bcrypt"
import userModel from "../models/usermodel.js";

async function createAdmin() {
    const username = process.env.ADMIN_USERNAME;
    
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
        console.warn("Admin credentials not found in .env");
        return;
    }

    const existingAdmin = await userModel.findOne({ username });
    if (existingAdmin) {
        console.log("✅ Admin user already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = await userModel.create({
        username,
        password: hashedPassword,
        firstName: process.env.ADMIN_FIRSTNAME || 'Admin',
        lastName: process.env.ADMIN_LASTNAME || 'User',
        profileurl:process.env.ADMIN_PROFILEURL,
        isAdmin: true
    });

    console.log(" Admin user created successfully");
}

export default createAdmin