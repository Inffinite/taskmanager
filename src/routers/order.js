const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const Order = require('../models/orders')
const Product = require('../models/product')
const moment = require('moment')
const router = new express.Router()

router.post('/addOrder', auth, async(req, res) => {
    const order = new Order(req.body)

    for(i = 0; i < order.products.length; i++){
        const product = await Product.findOne({ name: order.products[i].name })

        if(!product){
            console.log(`${order.products[i].name} not found in products list`)
            return res.status(400).send({ message: 'Product not found' })
        }

        // wowowowo

        const date = {
            date: moment(new Date()).format()
        }
        product.sale.push(date)
        product.salesCount = product.salesCount + 1
        product.salesTotal = product.salesTotal + product.priceInDollars
        product.stock = product.stock - 1

        // minus from total number of stocks

        await product.save()
    }
    
    
    try {
        order.userId = req.user._id
        await order.save()

        res.status(201).send({ order })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/getOrders', auth, async(req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })

        for(i = 0; i < orders.length; i++){
            const difference  = moment().diff(orders[i].deliveryDate, 'days')

            if(difference >= 0){
                orders[i].deliveryDate = 'Delivered'
            } else {
                orders[i].deliveryDate = moment(orders[i].deliveryDate).startOf('day').fromNow()
            }
        }

        res.status(201).send({ orders })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router