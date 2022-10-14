import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

import env from "./config.env.mjs";
import sequelize from "./database/config.mjs";
import router from "./api/routes/index.mjs";

const app = express();
const PORT = env.PORT;


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
    const error = new Error("PAGE NOT FOUND");
    res.status(404).json({ message: error.message });
});


try {
    await sequelize.authenticate();
    
    app.listen(PORT, ()=>{
        console.log(`SERVER RUNNING ON PORT ${PORT}`);
    });    
} catch (error) {
    console.log(`SERVER FAIL: ${error}`);
    process.exit(0);
}