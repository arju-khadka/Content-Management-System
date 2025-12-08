const express = require("express")
const { blogs, users } = require("./model/index")
const { Where } = require("sequelize/lib/utils")
require("dotenv").config()
const { storage, multer } = require("./middleware/multerConfig")
const { renderHome, renderAddBlog, addBlog, renderAddUser, addUSer, renderSingleBlog, renderDelete, renderUpdate, update } = require("./controller/blog/blogController")
const app = express()

const upload = multer({ storage: storage })




//telling nodejs to set its view engine to ejs
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))


// Home Page
app.get("/", renderHome)

app.get("/addblog", renderAddBlog)

app.post("/addblog", upload.single('image'), addBlog)

// user table
app.get("/adduser", renderAddUser)

app.post("/adduser", addUSer)

//single blog
app.get("/blog/:id", renderSingleBlog)

//delete
app.get("/delete/:id", renderDelete)


//update
app.get("/update/:id", renderUpdate)

app.post("/update/:id", update)

app.use(express.static("./uploads/"))



















app.listen(3000, () => {
    console.log("NodeJs project has started at port 3000")
})