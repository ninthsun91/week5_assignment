import { Router } from "express";
import * as Post from "../controllers/post.js";
import { authMiddleware, tempAuth } from "../../middlewares/auth.js";


const router = Router();


/**
 * request: { title, content }
 * response: { message }
 * auth
 */
router.post("/", tempAuth, Post.createOne);


/**
 * request: 
 * response: { data: [...{ postId, userId, nickname, title, 
 *                              createdAt, updatedAt, likes(:int) }] }
 */
router.get("/", Post.findAll);


/**
 * request:
 * response: { data: { postId, userId, nickname, title,
 *                            content, createdAt, updatedAt } }
 */
router.get("/:postId", Post.findOne);


/**
 * request: { title, content }
 * response: { message }
 * auth
 */
router.put("/:postId", tempAuth, Post.updateOne);


/**
 * request: 
 * response: { message }
 * auth
 */
router.delete("/:postId", tempAuth, Post.deleteOne);


/**
 * request:
 * response: { data: [...{ postId, userId, nickname, title, 
 *                              createdAt, updatedAt, likes(:int) }] }
 * auth
 */
router.get("/like", authMiddleware, Post.likeList);


/**
 * request: 
 * response: { message }
 * auth
 */
router.get("/:postId/like", authMiddleware, Post.toggleLike)


export default router;