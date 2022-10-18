import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

import env from "./config.env.mjs";
import sequelize from "./database/config/connection.mjs";
import router from "./api/routes/index.mjs";
import associateModels from "./database/config/association.mjs";


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


app.listen(PORT, async()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
    try {
        await sequelize.authenticate();
        associateModels(sequelize);
        
    } catch (error) {
        console.log(`SERVER FAIL: ${error}`);
        process.exit(0);
    };    
});