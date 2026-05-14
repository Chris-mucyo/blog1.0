import User from '../models/User.js'
import bcrypt from 'bcryptjs'

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findById(userId).populate('products', 'name category price');


        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.status(200).json(user)

    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)

    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}

export const removeUser = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findByIdAndDelete(userId)

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.status(200).json({
            message: 'Successfully removed',
            user
        })

    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const updateData = { ...req.body }

        if (updateData.password) {
            const salt = await bcrypt.genSalt(10)
            updateData.password = await bcrypt.hash(
                updateData.password,
                salt
            )
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.status(200).json({
            message: 'Successfully updated user',
            user: updatedUser
        })

    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}