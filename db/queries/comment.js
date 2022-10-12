import { models } from "../config.js";

const { Users, Posts, Comments, Likes } = models;


export async function createOne(comment) {
    console.log("COMMENT CREATEONE");
    const result = await Comments.create(comment);
    return {
        comment: result.get(),
        isNewRecord: result._options.isNewRecord
    }
}

export async function findOne(commentId) {
    console.log("COMMENT FINDONE");
    return Comments.findByPk(commentId);
}

export async function findAll(postId) {
    console.log("COMMENT FINDALL");
    return await Comments.findAll({
        where: { postId },
        order: [["createdAt", "DESC"], ["commentId", "DESC"]],
        attributes: {
            exclude: ["postId", "deletedAt"]
        },
        include: {
            model: Users,
            attributes: ["nickname"]
        }
    });
}

export async function updateOne(comment) {
    console.log("COMMENT UPDATEONE");

    const check = await Comments.findOne({
        where: { commentId: comment.commentId, userId: comment.userId }
    });
    if (check === null) {
        return [ null ];
    }

    return await Comments.update({
        comment: comment.comment
    }, {
        where: { commentId: comment.commentId }
    });
}

export async function deleteOne(ids) {
    console.log("COMMENT DELETEONE");

    const check = await Comments.findOne({
        where: { commentId: ids.commentId, userId: ids.userId }
    });
    if (check === null) {
        return [ null ];
    }

    return await Comments.destroy({
        where: { commentId: ids.commentId }
    });
}