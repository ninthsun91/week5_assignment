import { Router } from "express";
import * as Post from "../controllers/post.js";


const router = Router();


/**
 * request: { title, content }
 * response: { message }
 * auth
 */
router.post("/", Post.createOne);


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
router.put("/:postId", Post.updateOne);


/**
 * request: 
 * response: { message }
 * auth
 */
router.delete("/:postId", Post.deleteOne);


/**
 * request:
 * response: { data: [...{ postId, userId, nickname, title, 
 *                              createdAt, updatedAt, likes(:int) }] }
 * auth
 */
router.get("/like", Post.likeList);


/**
 * request: 
 * response: { message }
 * auth
 */
router.get("/:postId/like", Post.toggleLike)


export default router;