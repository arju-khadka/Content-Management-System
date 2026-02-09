const {addComment, deleteComment} = require("../controller/blog/blogController")
const { isAuthenticated } = require("../middleware/isAuthenticated")

const router = require("express").Router()

router.route("/comment").post(isAuthenticated ,addComment)
router.route("/deleteComment/:id").get(isAuthenticated,deleteComment)



module.exports = router