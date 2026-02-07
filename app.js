const express = require("express")
require("dotenv").config()
const app = express()
const cookieParser = require('cookie-parser')

const blogRoute = require("./routes/blogRoute")
const userRoute = require("./routes/userRoute")


//telling nodejs to set its view engine to ejs
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./uploads/"))

app.use((req,res,next)=>{
    res.locals.currentUser = req.cookies.token
    next()
})



app.use("", blogRoute)
app.use("",userRoute)

app.listen(3000, () => {
    console.log("NodeJs project has started at port 3000")
})