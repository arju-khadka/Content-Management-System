const { users } = require("../../model")

exports.renderAddUser = (req, res) => {
    res.render("addUSer")
}

exports.addUSer = async (req, res) => {

    const { name, email, password } = req.body


    //inserting into user tables
    await users.create({
        name: name,
        email: email,
        password : password
    })

    res.redirect("/")
}