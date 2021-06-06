const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const orderRouter = require('./routers/order')
const roomsRouter = require('./routers/rooms')
const chalk = require('chalk')
const cors = require('cors')
const app = express()
const port = process.env.PORT

const corsOptions = {
    origin: 'https://60bca68b5c3a87da3d70dde0--brave-aryabhata-26a3da.netlify.app/'
}

app.use(cors(corsOptions))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.json())
app.use(userRouter)
app.use(orderRouter)
app.use(roomsRouter)

app.listen(port, () => {
    console.log(chalk.yellow('[+] Server is up on port ' + port))
})
