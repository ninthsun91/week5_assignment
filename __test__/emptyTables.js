import Users from '../database/models/user.js';
import Posts from '../database/models/post.js';
import Comments from '../database/models/comment.js';
import Likes from '../database/models/like.js';


export default async function emptyTables() {
    await Likes.destroy({ where: {}, force:true });
    await Comments.destroy({ where: {}, force:true });
    await Posts.destroy({ where: {}, force:true });
    await Users.destroy({ where: {}, force:true });

    // await Likes.drop();
    // await Comments.drop();
    // await Posts.drop();
    // await Users.drop();

    // await Users.sync();
    // await Posts.sync();
    // await Comments.sync();
    // await Likes.sync();
}