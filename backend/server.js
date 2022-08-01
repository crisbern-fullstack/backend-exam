require('dotenv').config()

const express = require('express') //express import
const mongoose = require('mongoose') //mongoose import 
const AdminRoute = require('./routes/AdminRoute')

const app = express()

///middlewares
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api', AdminRoute)

mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT)
    })
 })
 .catch( error => {
    console.log(error)
 })

