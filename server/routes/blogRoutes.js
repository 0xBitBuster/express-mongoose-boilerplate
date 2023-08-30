const express = require("express")
const router = express.Router()

const blogController = require("../controllers/blogController")

router.get("/blog", blogController.blog)
router.get("/blog/:blogId", blogController.blogPost)
router.delete("/blog/:blogId", blogController.deleteBlogPost)
router.post("/blog", blogController.publishBlogPost)

module.exports = router