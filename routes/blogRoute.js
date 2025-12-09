const { renderFile } = require("ejs")
const { renderHome, renderAddBlog, addBlog, renderSingleBlog, renderDelete, update, renderUpdate } = require("../controller/blog/blogController")
const { storage, multer } = require("../middleware/multerConfig")
const router = require("express").Router()
const upload = multer({ storage: storage })

router.route("/").get(renderHome)
router.route("/addblog").get(renderAddBlog).post(upload.single('image'),addBlog)
router.route("/blog/:id").get(renderSingleBlog)
router.route("/delete/:id").get(renderDelete)
router.route("/update/:id").get(renderUpdate).post(update)






module.exports = router