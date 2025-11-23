const express = require("express")
const app = express()

require("./model/index")

//telling nodejs to set its view engine to ejs
app.set('view engine','ejs')

// Home Page
app.get("/",(req,res)=>{
    res.render("home")
})

//About page
app.get("/about",(req,res)=>{
    res.render("about")
})









app.listen(3000,()=>{
    console.log("NodeJs project has started at port 3000")
})