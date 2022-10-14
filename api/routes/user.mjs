import { Router } from "express";
import UserController from "../controllers/user.mjs";
import auth from "../../middlewares/auth.mjs";


const router = Router();
const User = new UserController();

/**
 * request: { nickname, password, confirm }
 * response: { message }
 * tokenChecker
 */
router.post("/signup", auth.tokenChecker, User.signup);


/**
 * request: { nickname, password }
 * response: { message }    // header: { accessToken, refreshToken }
 * tokenChecker
 */
router.post("/login", auth.tokenChecker, User.singin);


export default router;