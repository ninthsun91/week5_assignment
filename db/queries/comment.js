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
        attributes: {
            exclude: ["postId", "deletedAt"]
        },
        // include: [UserModel]
    });
}

export async function updateOne(comment) {
    console.log("COMMENT UPDATEONE");
    return await Comments.update({
        comment: comment.comment
    }, {
        where: { commentId: comment.commentId }
    });
}

export async function deleteOne(commentId) {
    console.log("COMMENT DELETEONE");
    return await Comments.destroy({
        where: { commentId }
    });
}