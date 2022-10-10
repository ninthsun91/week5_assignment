import { Router } from "express";


const router = Router();


/**
 * request: { title, content }
 * response: { message }
 */
router.post("/");


/**
 * request: 
 * response: { data: [...{ postId, userId, nickname, title, 
 *                              createdAt, updatedAt, likes(:int) }] }
 */
router.get("/");


/**
 * request:
 * response: { data: { postId, userId, nickname, title,
 *                            content, createdAt, updatedAt, likes(:int) } }
 */
router.get("/:postId");


/**
 * request: { title, content }
 * response: { message }
 */
router.put("/:postId");


/**
 * request: 
 * response: { message }
 */
router.delete("/:postId");


/**
 * request:
 * response: { data: [...{ postId, userId, nickname, title, 
 *                              createdAt, updatedAt, likes(:int) }] }
 */
router.get("/like");


/**
 * request: 
 * response: { message }
 */
router.get("/:postId/like")


export default router;