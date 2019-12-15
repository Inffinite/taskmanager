const { MongoClient, ObjectID } = require('mongodb')
const chalk = require('chalk')
const inspect = require('util-inspect')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database')
    }

    console.log(chalk.blue('Connected'))

    const db = client.db(databaseName)

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5dee90de3e4e0b86912c0846")
    // }, {
    //     $set: {
    //         name: 'Catherine',
    //         age: 19
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //   completed: false  
    // }, {
    //     $set:{
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').deleteMany({
    //     age: 18
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description: "Complete by Tuesday"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})