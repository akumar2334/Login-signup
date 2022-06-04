const express = require(`express`)
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const cors = require('cors')
require('dotenv').config();
// const PORT = process.env.PORT
const PORT = 5000


const middleware = require(`./middleware/auth`)
const userController = require(`./controllers/userController`)


app.use(cors()) // for allowing cross origin access


app.post(`/login`, ((req, res) => {
    userController.login(req, res)
}))
app.post(`/signup`, ((req, res) => {
    userController.signup(req, res)
}))

app.post(`/getUserDataByid`, middleware.ensureUser, (req, res) => {
    res.status(200).send(req.userData)
})
app.patch(`/update`, middleware.ensureUser, (req, res) => {
    if (req.userData) {
        userController.update(req, res)
    } else {
        res.status(401).send(`Unauthorized`)
    }
})


app.get(`/`, ((req, res) => { //test endpoint
    res.send(`test `)
}))

app.listen(PORT, (() => {
    console.log(`port ` + PORT)
}))