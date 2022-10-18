import { Router } from "express";

import userRouter from "./user.mjs";
import postRouter from "./post.mjs";
import commentRouter from "./comment.mjs";


const router = Router();

router.get("/api", (req, res, next)=>{
    res.redirect("https://app.swaggerhub.com/apis-docs/NINTHSUN91_1/hanghae_week4/1.0.0#/")
});


router.use("/", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);


export default router;