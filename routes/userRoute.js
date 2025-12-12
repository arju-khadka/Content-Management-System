const { renderAddUser, addUSer, renderLoginForm } = require("../controller/user/userController")

const router = require("express").Router()



router.route("/adduser").get(renderAddUser).post(addUSer)
router.route("/login").get(renderLoginForm)

module.exports = router