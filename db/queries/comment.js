import CommentModel from "../models/comment.js";


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
    const result = await CommentModel.findOne({
        where: { commentId }
    });
    return result!==null ? result.get() : null;
}

export async function findAll(postId) {
    console.log("COMMENT FINDALL");
    return await CommentModel.find({
        where: { postId }
    });
}

export async function updateOne(commentId) {
    console.log("COMMENT UPDATEONE");
    return await CommentModel.updateOne({}, {
        where: { commentId }
    });
}

export async function deleteOne(commentId) {
    console.log("COMMENT DELETEONE");
    return await CommentModel.destroy({
        where: { commentId }
    });
}