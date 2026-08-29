import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

//signup
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
       const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        })
        res.status(201).json({
            success: true,
            message: "user created successfully",
            data: newUser,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        )
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            })
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(200).json({
            success : true,
            message: "Login successful",
            token,
            data:{
                id: user._id,
                username: user.username,
                email:user.email,
            }
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message,
        });
    }
};