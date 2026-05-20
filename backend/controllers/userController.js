const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const e = require('cors');
const User = require('../models/userModel');

dotenv.config();


const signup = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        if (!username || !password || !email) {
            return res.status(400).json({
                message: "All fields are required!!"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists!!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            repositories: [],
            followesUsers: [],
            starRepo: [],
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        )

        return res.status(201).json({
            message: "Signup successful!!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token
        })

        module.exports = User;

    } catch (err) {
        console.log("Error in login : ", err.message),
            res.status(500).send("Server error")
    }
}

const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        if (!email || !password) {

            return res.status(400).json({
                message: "All fields are required!!"
            });

        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {

            return res.status(401).json({
                message: "Invalid credentials!!"
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid credentials!!"
            });

        }

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            token,
            userId: existingUser._id
        });

    } catch (err) {

        console.error("Error During login:", err.message);

        return res.status(500).json({
            message: "Server error!!"
        });

    }
};

const getAllUsers = (req, res) => {
    res.send("All users fetched!")
};

const getUserProfile = (req, res) => {
    res.send("Profile fetched!")
}

const updateUserProfile = (req, res) => {
    res.send("Profile updated!")
}

const deleteUserProfile = (req, res) => {
    res.send("Profile deleted!")
}

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}
