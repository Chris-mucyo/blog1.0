import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next ) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Baerer') ) {
            return res.status(401).json({
                message: 'Not authorized, please log in',
            });
        }

        const token = authHeader.split('')[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decode.id).select('-password');

        if (!req.user) {
            return res.status(401).json({
                message: 'User no longer exist',
            })
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired Token',
        })
    }
}