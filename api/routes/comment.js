import { Router } from "express";


const router = Router();


/**
 * request: { comment }
 * response: { message }
 */
router.post("/:postId");


/**
 * request: 
 * response: { data: [...{ commentId, userId, nickname, comment, 
 *                              createdAt, updatedAt }]}
 */
router.get("/:postId");


/**
 * request: { comment }
 * response: { message }
 */
router.put("/:commentId");


/**
 * request: 
 * response: { message }
 */
router.delete("/:commentId");


export default router;