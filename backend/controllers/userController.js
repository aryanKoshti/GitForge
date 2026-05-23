const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const User = require('../models/userModel');
let ObjectId = require("mongodb").ObjectId;

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

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err.message);

        return res.status(500).json({
            message: "Server error!!"
        });
    }
};

const getUserProfile = async (req, res) => {
    const currentID = req.params.id;

    try {
        const user = await User.findById(currentID);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({ message: "profile fetched",  user });
    } 
    catch (err) {
        console.error(
            "Error fetching users:",
            err.message
        );

        return res.status(500).json({
            message: "Server error!!"
        });
    }
}

const updateUserProfile = async (req, res) => {
    const userID = req.params.id;
    const { email, password } = req.body;
    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (email) {
            const existingUser = await User.findOne({ email });
            if (
                existingUser &&
                existingUser._id.toString() !== userID
            ) {
                return res.status(409).json({
                    message: "Email already in use"
                });
            }
            user.email = email;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(
                password,
                10
            );
            user.password = hashedPassword;
        }
        await user.save();
        return res.status(200).json({
            message: "Profile updated successfully"
        });
    } catch (err) {
        console.error(
            "Error updating profile:",
            err.message
        );
        return res.status(500).json({
            message: "Server error"
        });
    }
};

const deleteUserProfile = async (req, res) => {
    console.log(JSON.stringify(req.params.id));
    const userID = req.params.id.trim();
    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        await User.findByIdAndDelete(userID);
        return res.status(200).json({
            message: "Profile deleted successfully"
        });
    } catch (err) {
        console.error(
            "Error deleting profile:",
            err.message
        );
        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}
