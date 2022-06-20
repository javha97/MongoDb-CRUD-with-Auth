import mongoose from "mongoose";
const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    text: {
        type: String,
        required: [true, 'pls add a text value']
    }
}, {
    timestamps: true
})
export const goal = mongoose.model('goal', goalSchema)