import Blog from "../models/blog"
import slugify from "slugify"
export const createBlog = async (req, res) => {
    req.body.slug = slugify(req.body.title);
    try {
        const blog = await new Blog(req.body).save()
        return res.json(blog)
    } catch (error) {
        return res.json(error)
    }
}

export const listBlog = async (req, res) => {
    const { limit, page } = req.query
    const start = (page - 1) * limit
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(limit).skip(start).exec()
        return res.json(blogs)
    } catch (error) {
        return res.json(error.message)
    }
}
export const listBlogLatest = async (req, res) => {
    const { limit, start } = req.query
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(limit).skip(start - 1).exec()
        return res.json(blogs)
    } catch (error) {
        return res.json(error.message)
    }
}
export const editBlog = async (req, res) => {
    try {
        const editBlogs = req.body
        const blogs = await Blog.findOneAndUpdate({ _id: req.params.id }, editBlogs, { new: true }).exec()
        return res.json(blogs)
    } catch (error) {
        return res.json(error.message)
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blogs = await Blog.findOneAndDelete({ _id: req.params.id }, { new: true }).exec()
        return res.json(blogs)
    } catch (error) {
        return res.json(error.message)
    }
}

export const getDetailBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug }).exec()
        return res.json(blog)
    } catch (error) {
        return res.json(error.message)
    }
}