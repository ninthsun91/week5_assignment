import { Router } from "express";
import Comment from "../controllers/comment.js";
import auth from "../../middlewares/auth.js";


const router = Router();

/**
 * CREATE COMMENT
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: { comment }
 * response: { message }
 */
router.post("/:postId", auth.authMiddleware, Comment.createOne);


/**
 * COMMENT LIST BY POSTID
 * request: 
 * response: { data: [...{ commentId, userId, nickname, comment, 
 *                              createdAt, updatedAt }]}
 */
router.get("/:postId", Comment.getCommentList);


/**
 * UPDATE COMMENT
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: { comment }
 * response: { message }
 */
router.put("/:commentId", auth.authMiddleware, Comment.updateOne);


/**
 * DELETE COMMENT
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: 
 * response: { message }
 */
router.delete("/:commentId", auth.authMiddleware, Comment.deleteOne);


export default router;