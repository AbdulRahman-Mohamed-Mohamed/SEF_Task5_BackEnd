const express = require('express')

const Agent = require('../models/agents')

const router = express.Router()
//---------------------------------------

//  POST:
router.post('/agents', (req, res) => {
    const agent = new Agent(req.body)
    agent.save()

        .then((agent) => {
            res.status(200).send(agent) 
                console.log(agent)
            })
        .catch((error) => { res.status(400).send(error.message) })
})
//------------------------------------------------------

//  GET ALL:
router.get('/agents', (req, res) => {
    Agent.find({})
        
        .then((agents) => { 
            res.status(200).send(agents) 
                console.log(agents)
        })
        .catch((error) => { res.status(400).send(error.message) })
})
//------------------------------------------------------

//  GET BY ID:
router.get('/agents/:id', (req, res) => {
    const _id = req.params.id

    Agent.findById(_id)
        .then((agent) => {
            if (!agent) {
                console.log('ERROR(404)! Agent ID: ' + _id + ' NOT FOUND')
                return res.status(404).send('ERROR(404)! Agent ID: ' + _id + ' NOT FOUND')
            }
            else {
                res.status(200).send(agent)
                    console.log(agent)
            }
        })
        .catch((error) => { res.status(400).send(error.message) })
})
//------------------------------------------------------

//  PATCH:
router.patch('/agents/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const updates = Object.keys(req.body)

        const agent = await Agent.findById(_id)
            if (!agent) {
                console.log('ERROR(404)! Agent ID: ' + _id + ' NOT FOUND')
                res.status(404).send('ERROR(404)! Agent ID: ' + _id + ' NOT FOUND')
            }

            updates.forEach((ele)=>(agent[ele] = req.body[ele]))

            await agent.save()
                res.status(200).send(agent)
                    console.log('Agent ID: ' + _id + ' UPDATED ' , agent)

    }
    catch (error) {
        res.status(400).send(error.message)
    }
})
//------------------------------------------------------

//  DELETE BY ID:
router.delete('/agents/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const agent = await Agent.findByIdAndDelete(_id)
            if (!agent) {
                console.log('ERROR(404)! Agent ID: ' + _id + ' NOT FOUND')
                res.status(404).send('ERROR(404)! Agent ID: ' + _id + ' NOT FOUND')
            }
            else {
                res.status(200).send('Agent ID: ' + _id + ' Successfully DELETED')
                    console.log('Agent ID: ' + _id + ' Successfully DELETED')
            }
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})
//////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router