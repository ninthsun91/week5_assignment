/**
 * SEQUELIZE CONNECTION
 */
import { Sequelize } from "sequelize";
import env from "../config.env.mjs";

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
import Users from "./models/user.mjs";
import Posts from "./models/post.mjs";
import Comments from "./models/comment.mjs";
import Likes from "./models/like.mjs";
import associateModels from "./association.mjs";

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
