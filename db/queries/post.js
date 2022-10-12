import { models } from "../config.js";

const { Users, Posts, Likes } = models;


export async function createOne(post) {
    console.log("POST CREATEONE", post);
    await Posts.create(post);
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

    const check = await findLike(ids);
    return check === null ? await addLike(ids) : await deleteLike(ids);
}

async function findLike(ids) {
    console.log("FIND LIKE");
    return await Likes.findOne({
        where: { postId: ids.postId, userId: ids.userId }
    });
}

async function addLike(ids) {
    console.log("ADD LIKE");
    await Likes.create({ postId: ids.postId, userId: ids.userId });
    await Posts.increment({"likes": 1}, {where: { postId: ids.postId }});
    return "add";
}

async function deleteLike(ids) {
    console.log("DELETE LIKE");
    await Likes.destroy({
        where: { postId: ids.postId, userId: ids.userId }
    });
    await Posts.increment({"likes": -1}, {where: { postId: ids.postId }});
    return "delete";
}

export async function findLikes(userId) {
    console.log("LIKE LIST");

    return await Likes.findAll({
        where: { userId },
        attributes: ["likeId", "postId"],
        include: {
            model: Posts,
            attributes: {
                exclude: ["content"]
            },
            include: {
                model: Users,
                attributes: ["nickname"]
            }
        },
        order: [[Posts, "likes", "DESC"], [Posts, "updatedAt", "DESC"]]
    });
}

export async function countLikes(postId) {
    console.log("COUNT LIKES");

    return await Likes.count({
        where: { postId },
    });
}