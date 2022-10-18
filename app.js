import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

import env from "./config.env.js";
import sequelize from "./database/config/connection.js";
import router from "./api/routes/index.js";
import associateModels from "./database/config/association.js";
import { errorHandler } from "./middlewares/errorHandler.js";


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
    // res.status(404).send(error.message);
    res.status(404).json({ message: error.message });
});

app.use(errorHandler);




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