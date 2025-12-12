const { renderAddUser, addUSer, renderLoginForm, loginUser } = require("../controller/user/userController")

const router = require("express").Router()



router.route("/adduser").get(renderAddUser).post(addUSer)
router.route("/login").get(renderLoginForm).post(loginUser)

module.exports = router