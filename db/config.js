import { Sequelize } from "sequelize";
import env from "../config.env.js";
// import Comment from "./models/comment.js";
// import Post from "./models/post.js";
// import User from "./models/user.js";


const sequelizeConnection = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        dialect: "mysql",
        host: env.DB_HOST,
        // logging: false,
    }
);

// export async function syncTables() {
//     console.log("SYNC TABLES");
//     await User.sync({ alter: true });
//     await Post.sync({ alter: true });
//     await Comment.sync({ alter: true });
// }


export default sequelizeConnection;