const { renderAddUser, addUSer, renderLoginForm, loginUser, logOutUser, forgotPassword, handleForgotPassword } = require("../controller/user/userController")

const router = require("express").Router()



router.route("/adduser").get(renderAddUser).post(addUSer)
router.route("/login").get(renderLoginForm).post(loginUser)
router.route("/logout").get(logOutUser)
router.route("/forgotPassword").get(forgotPassword).post(handleForgotPassword)


module.exports = router