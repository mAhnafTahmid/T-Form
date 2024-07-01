import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: True
    },
    email: {
        type: String,
        required: True,
        unique: True
    },
    password: {
        type: String,
        required: True
    },
    codes: {
        type: [],
    },
})

export default mongoose.model('User', userSchema)