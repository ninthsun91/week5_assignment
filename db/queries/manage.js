import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import Like from "../models/like.js";


export async function syncTables() {
    await Like.drop();
    await Comment.drop();
    await Post.drop();
    await User.drop();

    await User.sync();
    await Post.sync();
    await Comment.sync();
    await Like.sync();
}