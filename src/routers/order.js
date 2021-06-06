const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const Request = require('../models/request')
const moment = require('moment')
const router = new express.Router()

router.post('/addRequest', async(req, res) => {
    const request = new Request(req.body)

    try {
        await request.save()
        const requests = await Request.find()
        res.status(200).send({ requests })
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.get('/getRequests', async(req, res) => {
    try {
        const requests = await Request.find().sort({'createdAt': -1})
        res.status(200).send({ requests })
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router