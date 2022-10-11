import PostModel from "../models/post.js";
import LikeModel from "../models/like.js";


export async function createOne(post) {
    console.log("POST CREATEONE", post);

    const result = await PostModel.create(post);
    return {
        user: result.get(),
        isNewRecord: result._options.isNewRecord,
    }
}

export async function findAll() {
    console.log("POST FINDALL");
    return await PostModel.findAll();
}

export async function findOne(postId) {
    console.log("POST FINDONE");
    return await PostModel.findByPk(postId);
}

export async function updateOne(post) {
    console.log("POST UPDATEONE");
    return await PostModel.update(post, {
        where: { postId: post.postId }
    });
}

export async function deleteOne(postId) {
    console.log("POST DELETEONE");
    return await PostModel.destroy({
        where: { postId }
    });
}

export function toggleLike() {
    console.log("TOGGLE LIKE");
}

export function findLikes() {
    console.log("LIKE LIST");
}