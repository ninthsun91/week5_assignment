/**
 * SEQUELIZE CONNECTION
 */
import { Sequelize } from "sequelize";
import env from "../config.env.js";

const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        dialect: "mysql",
        host: env.DB_HOST,
        logging: false,
    }
);

export default sequelize


/**
 * MODEL DEFINITION & ASSOCIATION
 */
import Users from "./models/user.js";
import Posts from "./models/post.js";
import Comments from "./models/comment.js";
import Likes from "./models/like.js";
import associateModels from "./association.js";

const modelDefiners = [
    Users, Posts, Comments, Likes
];
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}
associateModels(sequelize);

export const models = {
    Users: sequelize.model("Users"),
    Posts: sequelize.model("Posts"),
    Comments: sequelize.model("Comments"),
    Likes: sequelize.model("Likes"),
}
