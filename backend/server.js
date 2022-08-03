require('dotenv').config()

const express = require('express') //express import
const mongoose = require('mongoose') //mongoose import 
const DataQueryRoute = require('./routes/DataQueryRoute') //Routes for querying employees and companies
const AdminRoute = require('./routes/AdminRoute')
const session = require("express-session")
const passport = require("passport")

const app = express()

///middlewares
app.use(express.json())
app.use(express.static('storage/app/public'))

//authentication midllewares
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true
}))
app.use(passport.initialize())
app.use(passport.session())

//print in the console what kind of request was made
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes

//Data query for companies and employees
app.use('/api', DataQueryRoute)

//admin management
app.use('/admin', AdminRoute)

mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT)
    })
 })
 .catch( error => {
    console.log(error)
 })
