const mongoose = require('mongoose')

const Agent = mongoose.model('agent', {
    name: {
        type: String,
        required: true,
        trim: true,
        validate(val){
            if(val.length <= 2)
                throw new Error('The Name MUST be LONGER than (2) characters')
        }
    },
    age: {
        type: Number,
        required: true,
        validate(val) {
            if (val <= 17)
                throw new Error('Age MUST be OVER (+17)')
        }
    },
    city: {
        type: String,
        trim: true,
        default: 'Cairo',
        validate(val){
            if(val.length <= 2)
                throw new Error('The Name MUST be LONGER than (2) characters')
        }
    }
})

module.exports = Agent