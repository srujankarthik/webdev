const mongoose = require('mongoose');
const {Schema} = mongoose

const TaskSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Please provide a value'], 
        trim: true, 
        maxlength: [20, `Can't exceed more than 20 chars`]
    }, 
    completed: {
        type: Boolean, 
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)