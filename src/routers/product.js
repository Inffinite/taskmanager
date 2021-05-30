const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const Product = require('../models/product')
const router = new express.Router()

router.post('/addProduct', auth, async (req, res) => {
    const product = new Product(req.body)

    try {
        await product.save()
        res.status(201).send({ product })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/getProducts', auth, async (req, res) => {
    try {
        const products = await Product.find()
        res.status(201).send({ products })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/analytics', auth, async (req, res) => {
    const products = await Product.find()
    console.log(products)

    try {
        var mostSales = [
            {
                index: 0,
                sales: 0
            }
        ]
        let i;
        for(i = 0; i < products.length; i++){
            if(products[i].sale.length > mostSales[0].index){
                mostSales = [
                    {
                        index: i,
                        sales: products[i].sale.length
                    }
                ]
            }
        }

        console.log(mostSales)
        var productWithMostSales = products[mostSales[0].index]

        var leastSales = [
            {
                index: 0,
                sales: mostSales[0].sales
            }
        ]

        let n;
        for(n = 0; n < products.length; n++){
            if(products[n].sale.length < leastSales[0].sales){
                leastSales = [
                    {
                        index: n,
                        sales: products[n].sale.length
                    }
                ]
            }
        }

        console.log(leastSales)
        var productWithLeastSales = products[leastSales[0].index]
        
        res.status(201).send(
            {
                productWithMostSales,
                productWithLeastSales
            }
        )
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/addSale', auth, async (req, res) => {
    const product = await Product.findProductByName(req.body.name)

    if(!product){
        return res.status(400).send({ message: 'Product not found' })
    }
    
    try {
        const date = moment(new Date()).format()
        product.salesCount = product.salesCount++
        product.salesTotal = product.salesTotal + product
        product.sale.push(date)
        product.stock = product.stock - 1

        // minus from total number of stocks

        await product.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router