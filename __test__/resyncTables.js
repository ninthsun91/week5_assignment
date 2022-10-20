import sequelize from "../database/config/connection.js";
import Users from "../database/models/user.js";
import Posts from "../database/models/post.js";
import Comments from "../database/models/comment.js";
import Likes from "../database/models/like.js";

async function syncTables() {
    await Likes.drop();
    await Comments.drop();
    await Posts.drop();
    await Users.drop()
    
    await Users.sync();
    await Posts.sync();
    await Comments.sync();
    await Likes.sync();

    sequelize.close();
}

export default syncTables;