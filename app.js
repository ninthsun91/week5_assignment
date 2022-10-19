import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

import env from "./config.env.js";
import router from "./api/routes/index.js";
import { InvalidAccessError } from "./utils/httpException.js";
import { errorLogger, errorHandler } from "./middlewares/errorHandler.js";


const app = express();


app.use(express.json());
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

app.use("/", router);

app.use((req, res, next)=>{
    const error = new InvalidAccessError("PAGE NOT FOUND", 404);
    next(error);
});

app.use(errorLogger);
app.use(errorHandler);


export default app;