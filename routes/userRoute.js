const { renderAddUser, addUSer, renderLoginForm, loginUser, logOutUser } = require("../controller/user/userController")

const router = require("express").Router()



router.route("/adduser").get(renderAddUser).post(addUSer)
router.route("/login").get(renderLoginForm).post(loginUser)
router.route("/logout").get(logOutUser)


module.exports = router