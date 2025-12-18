
const { blogs } = require("../../model")


exports. renderHome = async (req, res) => {
    //blogs table bata data(row) nikalnu paro ani homepage lai pass garnuparo
    const blogsTableBlogs = await blogs.findAll()

    res.render("home", { blogs: blogsTableBlogs })
}

exports. renderAddBlog =  (req, res) => {
    res.render("addBlog")
}

exports.addBlog = async (req, res) => {
    const { userId } = req

    // const title = req.body.title
    // const subTitle = req.body.subTitle
    // const description = req.body.description
    const { title, subTitle, description } = req.body
    if (!title || !subTitle || !description) {
        return res.send("Please provide title,subtitle and description")
    }

    //inserting into blogs tables
    await blogs.create({
        title: title,
        subTitle: subTitle,
        description: description,
        image: process.env.backendUrl + req.file.filename,
        userId : userId
    })

    res.redirect("/")
}



exports.renderSingleBlog = async (req, res) => {
    const id = req.params.id
    //    const foundData = await blogs.findByPk(id)
    const foundData = await blogs.findAll({
        where: {
            id: id
        }
    })
    console.log(foundData)
    res.render("singleBlog.ejs", { blog: foundData })
}

exports.renderDelete = async (req, res) => {
    const id = req.params.id
    await blogs.destroy({
        where: {
            id: id
        }
    })
    res.redirect("/")

}

exports.renderUpdate = async (req, res) => {
    const id = req.params.id
    const blog = await blogs.findByPk(id)
    res.render("updateBlog",
        {
            id: id,
            blog: blog
        })
}

exports.update = async (req, res) => {
    const { id } = req.params
    const { title, subTitle, description } = req.body
    await blogs.update({
        title: title,
        subTitle: subTitle,
        description: description

    }, {
        where: {
            id: id
        }
    })
    res.redirect("/blog/" + id)

}