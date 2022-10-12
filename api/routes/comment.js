import { Router } from "express";
import * as Comment from "../controllers/comment.js";
import { authMiddleware, tempAuth } from "../../middlewares/auth.js";


const router = Router();


/**
 * request: { comment }
 * response: { message }
 * auth
 */
router.post("/:postId", tempAuth, Comment.createOne);


/**
 * request: 
 * response: { data: [...{ commentId, userId, nickname, comment, 
 *                              createdAt, updatedAt }]}
 */
router.get("/:postId", Comment.getCommentList);


/**
 * request: { comment }
 * response: { message }
 * auth
 */
router.put("/:commentId", tempAuth, Comment.updateOne);


/**
 * request: 
 * response: { message }
 * auth
 */
router.delete("/:commentId", tempAuth, Comment.deleteOne);


export default router;