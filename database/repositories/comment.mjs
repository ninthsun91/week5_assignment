import { models } from "../config.mjs";

const { Users, Comments } = models;


export default class CommentRepository {
    createOne = async(comment) => {
        await Comments.create(comment);
    }
    findOne = async(commentId) => {
        return Comments.findByPk(commentId);
    }
    findAll = async(postId) => {
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
    updateOne = async(comment) => {                         // check logic to service
        const check = await Comments.findOne({
            where: { commentId: comment.commentId },
            attributes: ["userId"]
        });
        if (check.get().userId !== comment.userId) return [ null ];
    
        return await Comments.update({
            comment: comment.comment
        }, {
            where: { commentId: comment.commentId }
        });
    }
    deleteOne = async(ids) => {                         // check logic to service
        const check = await Comments.findOne({
            where: { commentId: ids.commentId },
            attributes: ["userId"]
        });
        if (check.get().userId !== ids.userId) return null;
    
        return await Comments.destroy({
            where: { commentId: ids.commentId }
        });
    }
}