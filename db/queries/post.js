import { models } from "../config.js";

const { Users, Posts, Comments, Likes } = models;


export async function createOne(post) {
    console.log("POST CREATEONE", post);

    const result = await Posts.create(post);
    return {
        user: result.get(),
        isNewRecord: result._options.isNewRecord,
    }
}

export async function findAll() {
    console.log("POST FINDALL");
    return await Posts.findAll({
        order: [["createdAt", "DESC"]],
        include: [Users]
    });
}

export async function findOne(postId) {
    console.log("POST FINDONE");
    return await Posts.findByPk(postId);
}

export async function updateOne(post) {
    console.log("POST UPDATEONE");
    return await Posts.update(post, {
        where: { postId: post.postId }
    });
}

export async function deleteOne(postId) {
    console.log("POST DELETEONE");
    return await Posts.destroy({
        where: { postId }
    });
}

export function toggleLike() {
    console.log("TOGGLE LIKE");
}

export function findLikes() {
    console.log("LIKE LIST");
}