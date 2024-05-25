import mongoose from 'mongoose'

const formSchema = mongoose.Schema({
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
    code: {
        type: String,
        reqired: True,
        unique: True
    },
    date: {
        type: Date,
        required: True
    },
    questions: {
        type: []
    }
})

export default mongoose.model('Form', formSchema)