import { Router } from "express";
import * as Comment from "../controllers/comment.js";


const router = Router();


/**
 * request: { comment }
 * response: { message }
 */
router.post("/:postId", Comment.createOne);


/**
 * request: 
 * response: { data: [...{ commentId, userId, nickname, comment, 
 *                              createdAt, updatedAt }]}
 */
router.get("/:postId", Comment.getCommentList);


/**
 * request: { comment }
 * response: { message }
 */
router.put("/:commentId", Comment.updateOne);


/**
 * request: 
 * response: { message }
 */
router.delete("/:commentId", Comment.deleteOne);


export default router;