import { Router } from "express";
import { sync } from "../controllers/index.js";

import userRouter from "./user.js";
import postRouter from "./post.js";
import commentRouter from "./comment.js";


const router = Router();

router.get("/", (req, res, next)=>{
    res.send("INDEX")
});

// RECREATE TABLES
router.get("/sync", sync);

router.use("/", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);


export default router;