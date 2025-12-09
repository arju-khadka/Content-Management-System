const { users } = require("../../model")

exports.renderAddUser = (req, res) => {
    res.render("addUSer")
}

exports.addUSer = async (req, res) => {

    const { name, email, age } = req.body


    //inserting into user tables
    await users.create({
        name: name,
        email: email,
        age: age
    })

    res.send("User registered successfully")
}