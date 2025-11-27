const express = require("express")
const { blogs , users } = require("./model/index")
const app = express()



//telling nodejs to set its view engine to ejs
app.set('view engine','ejs')

app.use(express.urlencoded({extended : true}))


// Home Page
app.get("/", async(req,res)=>{
    //blogs table bata data(row) nikalnu paro ani homepage lai pass garnuparo
    const blogsTableBlogs = await blogs.findAll()
    
    res.render("home", {blogs : blogsTableBlogs})
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
    if(!title || !subTitle || !description){
        return res.send("Please provide title,subtitle and description")
    }
    
    //inserting into blogs tables
   await blogs.create({
        title : title,
        subTitle : subTitle,
        description : description
    })

    res.redirect("/")
})

// user table
app.get("/adduser",(req,res)=>{
    res.render("addUser")
})

app.post("/adduser",async(req,res)=>{
    console.log(req.body)

    
    const {name,email,age} = req.body
    
    
    //inserting into user tables
   await users.create({
        name : name,
        email : email,
        age : age
    })

    res.send("User registered successfully")
})










app.listen(3000,()=>{
    console.log("NodeJs project has started at port 3000")
})