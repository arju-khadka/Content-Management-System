const { users } = require("../../model")
const bcrypt = require("bcryptjs")

exports.renderAddUser = (req, res) => {
    res.render("addUSer")
}

exports.addUSer = async (req, res) => {

    const { name, email, password } = req.body


    //inserting into user tables
    await users.create({
        name: name,
        email: email,
        password : bcrypt.hashSync(password,12)
    })

    res.redirect("/")
}