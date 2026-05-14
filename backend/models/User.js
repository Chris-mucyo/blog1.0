import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'user', 'moderator'],
            default: 'user',
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            }
        ],

},
    {
        timestamps: true
    })

export default mongoose.model('User', userSchema);