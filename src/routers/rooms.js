const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/user')
const Request = require('../models/request')
const Rooms = require('../models/rooms')
const { request } = require('express')
const router = new express.Router()

router.post('/addRoom', auth, async(req, res) => {
    const rooms = new Rooms(req.body)

    try {
        await rooms.save()
        res.status(200).send()
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.post('/book', async(req, res) => {
    try {
        // room[0].booked = req.body.status
        // user[0].bookedRoomId = room[0]._id
        // await user[0].save()
        // await room[0].save()
        await Rooms.updateOne({ _id: req.query.roomId }, {$set: { booked: true }})
        await User.updateOne({ _id: req.query._id }, {$set: { bookedRoomId: req.query.roomId }})
        
        const room = await Rooms.find({ _id: req.query.roomId })

        res.status(200).send({ room })
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.get('/getRoom', auth, async(req, res) => {
    try {
        const room = await Rooms.find({ _id: req.query.roomId })
        res.status(200).send({ room })
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

router.get('/checkout', async(req, res) => {
    const user = await User.findOne({ _id: req.query.userId })

    if(!user){
        res.status(400).send()
    }

    try {
        await Rooms.updateOne({ _id: user.bookedRoomId }, {$set: { booked: false }})
        await User.updateOne({ _id: user._id }, {$unset: {bookedRoomId: {}}})
        // user.bookedRoomId = ''
        // await user.save()
        res.status(200).send()
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.get('/getRooms', auth, async(req, res) => {
    try {
        const rooms = await Rooms.find()
        res.status(200).send({ rooms })
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

module.exports = router