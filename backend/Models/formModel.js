import mongoose from 'mongoose'

const formSchema = mongoose.Schema({
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