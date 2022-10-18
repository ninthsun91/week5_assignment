import { Router } from "express";
import PostController from "../controllers/post.js";
import auth from "../../middlewares/auth.js";


const router = Router();
const Post = new PostController();


/**
 * CREATE POST
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: { title, content }
 * response: { message }
 */
router.post("/", auth.authMiddleware, Post.createOne);


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
router.put("/:postId", auth.authMiddleware, Post.updateOne);


/**
 * DELETE POST
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: 
 * response: { message }
 */
router.delete("/:postId", auth.authMiddleware, Post.deleteOne);


/**
 * FIND LIKED POSTS BY CURRENT USER
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request:
 * response: { data: [...{ postId, userId, nickname, title, 
 *                              createdAt, updatedAt, likes(:int) }] }
 */
router.get("/like", auth.authMiddleware, Post.likeList);


/**
 * TOGGLE LIKE
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: 
 * response: { message }
 */
router.get("/:postId/like", auth.authMiddleware, Post.toggleLike)


export default router;