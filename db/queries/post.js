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
        order: [["createdAt", "DESC"], ["postId", "DESC"]],
        include: {
            model: Users,
            attributes: ["nickname"]
        }
    });
}

export async function findOne(postId) {
    console.log("POST FINDONE");
    return await Posts.findByPk(postId, {
        include: {
            model: Users,
            attributes: ["nickname"]
        }
    });
}

export async function updateOne(post) {
    console.log("POST UPDATEONE");

    const check = await Posts.findOne({
        where: { postId: post.postId },
        attributes: ["userId"]
    });
    if (check.get().userId !== post.userId) return [null];

    return await Posts.update(post, {
        where: { postId: post.postId, userId: post.userId }
    });
}

export async function deleteOne(ids) {
    console.log("POST DELETEONE");

    const check = await Posts.findOne({
        where: { postId: ids.postId },
        attributes: ["userId"]
    });
    if (check.get().userId !== ids.userId) return null;

    return await Posts.destroy({
        where: { postId: ids.postId, userId: ids.userId }
    });
}

export async function toggleLike(ids) {
    console.log("TOGGLE LIKE");

    console.log(ids);

    const check = await findLike(ids);
    if (check ===  null) {
        return await addLike(ids);
    } else {
        return await deleteLike(ids);
    }
}

async function findLike(ids) {
    console.log("FIND LIKE");
    return await Likes.findOne({
        where: { postId: ids.postId, userId: ids.userId }
    });
}

async function addLike(ids) {
    console.log("ADD LIKE");
    return await Likes.create({ postId: ids.postId, userId: ids.userId });
}

async function deleteLike(ids) {
    console.log("DELETE LIKE");
    return await Likes.destroy({
        where: { postId: ids.postId, userId: ids.userId }
    });
}

export async function findLikes(userId) {
    console.log("LIKE LIST");
}

export async function countLikes(postId) {
    console.log("COUNT LIKES");

    return await Likes.count({
        where: { postId }
    });
}