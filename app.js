import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

import env from "./config.env.js";
import sequelizeConnection from "./db/config.js";


try {
    await sequelizeConnection.authenticate();
    console.log("DB CONNECTED");
    
} catch (error) {
    console.log(`SERVER FAIL: ${error}`);
    process.exit(0);
}


import commentRouter from "./api/routes/comment.js";
import postRouter from "./api/routes/post.js";
import userRouter from "./api/routes/user.js";


const app = express();
const PORT = env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: env.SESSION_KEY,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

app.use("/comments", commentRouter);
app.use("/posts", postRouter);
app.use("/", userRouter);

app.use((req, res, next)=>{
    const error = new Error("PAGE NOT FOUND");
    res.status(404).json({ message: error.message });
});


app.listen(PORT, ()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});    

// try {
//     await sequelizeConnection.authenticate();
    
//     app.listen(PORT, ()=>{
//         console.log(`SERVER RUNNING ON PORT ${PORT}`);
//     });    
// } catch (error) {
//     console.log(`SERVER FAIL: ${error}`);
//     process.exit(0);
// }