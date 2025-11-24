const express = require("express")
const app = express()

const blogs = require("./model/blogModel"); 

require("./model/index")

//telling nodejs to set its view engine to ejs
app.set('view engine','ejs')

app.use(express.urlencoded({extended : true}))


// Home Page
app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/addblog",(req,res)=>{
    res.render("addBlog")
})

app.post("/addblog",async(req,res)=>{
    console.log(req.body)

    // const title = req.body.title
    // const subTitle = req.body.subTitle
    // const description = req.body.description
    const {title,subTitle,description} = req.body
    
    //inserting into blogs tables
   await blogs.create({
        title : title,
        subTitle : subTitle,
        description : description
    })

    res.send("Blog added successfully")
})









app.listen(3000,()=>{
    console.log("NodeJs project has started at port 3000")
})