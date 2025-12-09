const { renderAddUser, addUSer } = require("../controller/user/userController")

const router = require("express").Router()


router.route("/adduser").get(renderAddUser).post (addUSer)
router.route("/adduser").get(renderAddUser).post(addUSer)

module.exports = router