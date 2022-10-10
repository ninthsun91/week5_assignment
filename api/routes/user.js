import { Router } from "express";
import * as User from "../controllers/user.js";


const router = Router();

/**
 * request: { nickname, password, confirm }
 * response: { message }
 */
// router.post("/signup", User.signup);


/**
 * request: { nickname, password }
 * response: { token }
 */
// router.post("/login", User.singin);


export default router;