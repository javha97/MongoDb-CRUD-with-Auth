import mongoose from "mongoose";
const userSChema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'pls add a name']
    },
    password: {
        type: String,
        required: [true, 'pls add a name']
    },
    email: {
        type: String,
        required: [true, 'pls add a name'],
        unique: true,
    }
}, {
    timestamps: true
})
export const user=mongoose.model('user', userSChema)