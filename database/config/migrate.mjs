import sequelize from "./connection.mjs";
import Users from "../models/user.mjs";
import Posts from "../models/post.mjs";
import Comments from "../models/comment.mjs";
import Likes from "../models/like.mjs";

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