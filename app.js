const express = require("express")
require("dotenv").config()
const app = express()

const blogRoute = require("./routes/blogRoute")


//telling nodejs to set its view engine to ejs
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./uploads/"))



app.use("", blogRoute)

app.listen(3000, () => {
    console.log("NodeJs project has started at port 3000")
})