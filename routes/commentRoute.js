const {addComment} = require("../controller/blog/blogController")
const { isAuthenticated } = require("../middleware/isAuthenticated")

const router = require("express").Router()

router.route("/comment").post(isAuthenticated ,addComment)



module.exports = router