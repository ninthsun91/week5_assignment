import { Router } from "express";
import * as Post from "../controllers/post.js";


const router = Router();


/**
 * request: { title, content }
 * response: { message }
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
 */
router.put("/:postId", Post.updateOne);


/**
 * request: 
 * response: { message }
 */
router.delete("/:postId", Post.deleteOne);


/**
 * request:
 * response: { data: [...{ postId, userId, nickname, title, 
 *                              createdAt, updatedAt, likes(:int) }] }
 */
router.get("/like", Post.likeList);


/**
 * request: 
 * response: { message }
 */
router.get("/:postId/like", Post.toggleLike)


export default router;