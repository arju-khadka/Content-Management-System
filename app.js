const express = require("express")
const app = express()

//telling nodejs to set its view engine to ejs
app.set('view engine','ejs')

// Home Page

app.get("/",(rew,res)=>{
    res.render("home")
})

app.get("/about",(rew,res)=>{
    res.render("about")
})









app.listen(3000,()=>{
    console.log("NodeJs project has started at port 3000")
})