const mongoose = require('mongoose')

const validator = require('validator')

const bcryptjs = require('bcryptjs')

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(val){
            if(val.length <= 2)
                throw new Error('The Name MUST be LONGER than (2) characters')
        }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(val){
            if(!validator.isEmail(val))
                throw new Error('This is NOT a PROPER email FORMAT!')
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(val){
            if(val.length <= 7)
                throw new Error('The password MUST be at least (8) characters LONG!')
        },
        validate(val){
            let strongPass = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&*])(?=.*[0-9])')

            if(!strongPass.test(val))
                throw new Error('Password MUST Contain Uppercase, Lowercase, Number and Special Character!')
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

agentSchema.pre('save', async function () {
    const agent = this

    if(agent.isModified('password'))
        agent.password = await bcryptjs.hash(agent.password, 8)
})

const Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent