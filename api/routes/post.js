import { Router } from "express";
import * as Post from "../controllers/post.js";
import { tempAuth } from "../../middlewares/auth.js";


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
 *                            content, createdAt, updatedAt, likes(:int) } }
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
router.get("/like", tempAuth, Post.likeList);


/**
 * request: 
 * response: { message }
 * auth
 */
router.get("/:postId/like", tempAuth, Post.toggleLike)


export default router;