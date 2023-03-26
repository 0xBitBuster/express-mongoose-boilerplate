const BlogPost = require("../models/BlogPost");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync")

/**
 * Blog Page
 * @route   GET /api/blog
 * @access  Public
 */
exports.blog = (req, res, next) => {
    return res.json({ ok: true, msg: "This is the blog." });
};

/**
 * Blog Post
 * @route   GET /api/blog/:blogId
 * @access  Public
 */
exports.blogPost = catchAsync(async (req, res, next) => {
    const { blogId } = req.params

    const blog = await BlogPost.findById(blogId)
    if (!blog) {
        return next(new AppError("Blog not found", 404))
    }

    return res.json({ ok: true, blog });
});

/**
 * Publish Blog Post
 * @route   POST /api/blog
 * @access  Public
 */
exports.publishBlogPost = catchAsync(async (req, res, next) => {
    const { title, text } = req.body

    const blogPost = await BlogPost.create({ title, text })

    return res.json({ ok: true, msg: `Blog post was published and has the id ${blogPost._id}` });
});

/**
 * Delete Blog Post
 * @route   DELETE /api/blog/:blogId
 * @access  Public
 */
exports.deleteBlogPost = catchAsync(async (req, res, next) => {
    const { blogId } = req.params

    const blog = await BlogPost.findByIdAndDelete(blogId)
    if (!blog) {
        return next(new AppError("Blog not found", 404))
    }

    return res.json({ ok: true, msg: "Blog was deleted." });
});