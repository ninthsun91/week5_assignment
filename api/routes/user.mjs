import { Router } from "express";
import UserController from "../controllers/user.mjs";
import { tokenChecker } from "../../middlewares/auth.mjs";


const router = Router();
const User = new UserController();

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