const { renderAddUser, addUSer, renderLoginForm, loginUser, logOutUser, forgotPassword, handleForgotPassword, renderOtpForm, verifyOtp, renderResetPassword, handleResetPassword, catchError } = require("../controller/user/userController")

const router = require("express").Router()



router.route("/adduser").get(catchError(renderAddUser)).post(catchError(addUSer))
router.route("/login").get(renderLoginForm).post(loginUser)
router.route("/logout").get(logOutUser)
router.route("/forgotPassword").get(forgotPassword).post(handleForgotPassword)
router.route("/otpForm").get(renderOtpForm)
router.route("/verifyOtp/:id").post(verifyOtp)
router.route("/resetPassword").get(renderResetPassword)
router.route("/resetPassword/:email/:otp").post(handleResetPassword)


module.exports = router