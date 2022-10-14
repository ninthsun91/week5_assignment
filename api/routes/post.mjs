import { Router } from "express";
import PostController from "../controllers/post.mjs";
import { authMiddleware } from "../../middlewares/auth.mjs";


const router = Router();
const Post = new PostController();


/**
 * CREATE POST
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: { title, content }
 * response: { message }
 */
router.post("/", authMiddleware, Post.createOne);


/**
 * FIND ALL POST
 * request: 
 * response: { data: [...{ postId, userId, nickname, title, 
 *                              createdAt, updatedAt, likes(:int) }] }
 */
router.get("/", Post.findAll);


/**
 * FIND POST BY POSTID
 * request:
 * response: { data: { postId, userId, nickname, title,
 *                            content, createdAt, updatedAt } }
 */
router.get("/:postId", Post.findOne);


/**
 * UPDATE POST
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: { title, content }
 * response: { message }
 */
router.put("/:postId", authMiddleware, Post.updateOne);


/**
 * DELETE POST
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: 
 * response: { message }
 */
router.delete("/:postId", authMiddleware, Post.deleteOne);


/**
 * FIND LIKED POSTS BY CURRENT USER
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request:
 * response: { data: [...{ postId, userId, nickname, title, 
 *                              createdAt, updatedAt, likes(:int) }] }
 */
router.get("/like", authMiddleware, Post.likeList);


/**
 * TOGGLE LIKE
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: 
 * response: { message }
 */
router.get("/:postId/like", authMiddleware, Post.toggleLike)


export default router;