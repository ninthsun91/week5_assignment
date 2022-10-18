import { Router } from "express";

import userRouter from "./user.js";
import postRouter from "./post.js";
import commentRouter from "./comment.js";


const router = Router();

router.get("/api", (req, res, next)=>{
    res.redirect("https://app.swaggerhub.com/apis-docs/NINTHSUN91_1/hanghae_week4/1.0.0#/")
});


router.use("/", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);


export default router;