import CommentModel from "../models/comment.js";
import UserModel from "../models/user.js";


export async function createOne(comment) {
    console.log("COMMENT CREATEONE");
    const result = await CommentModel.create(comment);
    return {
        comment: result.get(),
        isNewRecord: result._options.isNewRecord
    }
}

export async function findOne(commentId) {
    console.log("COMMENT FINDONE");
    return CommentModel.findByPk(commentId);
}

export async function findAll(postId) {
    console.log("COMMENT FINDALL");
    return await CommentModel.findAll({
        where: { postId },
        attributes: {
            exclude: ["postId", "deletedAt"]
        },
        // include: [UserModel]
    });
}

export async function updateOne(comment) {
    console.log("COMMENT UPDATEONE");
    return await CommentModel.update({
        comment: comment.comment
    }, {
        where: { commentId: comment.commentId }
    });
}

export async function deleteOne(commentId) {
    console.log("COMMENT DELETEONE");
    return await CommentModel.destroy({
        where: { commentId }
    });
}