import { Router } from "express"
import { createBlog, deleteBlog, editBlog, getDetailBlog, listBlog, listBlogLatest } from '../controllers/blog'
import { isAdmin } from "../middlewares/auth"
import { jwtVerifyToken } from "../middlewares/verifyToken"

const router = Router()

router.get("/blogs", listBlog)
router.get('/blogs-latest', listBlogLatest)
router.get("/blogs/:slug", getDetailBlog)
router.post("/blog/add", jwtVerifyToken, isAdmin, createBlog)
router.put("/blog/:id", jwtVerifyToken, isAdmin, editBlog)
router.delete("/blog/:id", jwtVerifyToken, isAdmin, deleteBlog)

export default router