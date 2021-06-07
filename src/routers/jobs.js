const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/user')
const Jobs = require('../models/jobs')
const { request } = require('express')
const router = new express.Router()

router.post('/addJob', async(req, res) => {
    console.log(req.body)
    const jobs = new Jobs(req.body)

    try {
        await jobs.save()
        res.status(200).send()
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.get('/jobs', async(req, res) => {
    try {
        const jobs = await Jobs.find().sort({ 'createdAt': -1 })
        res.status(200).send(jobs)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

module.exports = router