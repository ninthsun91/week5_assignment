import sequelize from "./connection.js";
import Users from "../models/user.js";
import Posts from "../models/post.js";
import Comments from "../models/comment.js";
import Likes from "../models/like.js";

(async function syncTables() {
    await Likes.drop();
    await Comments.drop();
    await Posts.drop();
    await Users.drop()
    
    await Users.sync();
    await Posts.sync();
    await Comments.sync();
    await Likes.sync();

    sequelize.close();
})();