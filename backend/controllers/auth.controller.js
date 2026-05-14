import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
    try {
        const {username, email, password } = req.body;

        const checkUser = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (checkUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        )

        res.status(201).json({
            message: 'User registered',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const Login = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const user = await User.findOne({
            $or:[
                { email: email },
                { username: username },
            ]
        })

        if( !user ) {
            return res.status(400).json({
                message: 'User does not exist'
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if( !isMatch ) {
            return res.status(400).json({
                message: 'User does not exist'
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        )

        res.status(200).json({
            message: 'User logged in successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}