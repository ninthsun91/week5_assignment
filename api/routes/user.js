import { Router } from "express";
import * as User from "../controllers/user.js";
import { tokenChecker } from "../../middlewares/auth.js";


const router = Router();

/**
 * request: { nickname, password, confirm }
 * response: { message }
 * tokenChecker
 */
router.post("/signup", tokenChecker, User.signup);


/**
 * request: { nickname, password }
 * response: { message }    // header: { accessToken, refreshToken }
 * tokenChecker
 */
router.post("/login", tokenChecker, User.singin);


export default router;