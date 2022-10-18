import Users from "../../database/models/user.js";
import Comments from "../../database/models/comment.js";


export default {
    createOne: async(comment) => {
        return await Comments.create(comment);
    },

    findOne: async(commentId) => {
        return Comments.findByPk(commentId);
    },

    findAll: async(postId) => {
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
    },

    updateOne: async(comment) => {
        return await Comments.update({
            comment: comment.comment
        }, {
            where: { commentId: comment.commentId }
        });
    },

    deleteOne: async(ids) => {
        return await Comments.destroy({
            where: { commentId: ids.commentId, userId: ids.userId }
        });
    }
}

// import { models } from "../config.mjs";

// const { Users, Comments } = models;


// export default {
//     createOne: async(comment) => {
//         return await Comments.create(comment);
//     },

//     findOne: async(commentId) => {
//         return Comments.findByPk(commentId);
//     },

//     findAll: async(postId) => {
//         return await Comments.findAll({
//             where: { postId },
//             order: [["createdAt", "DESC"], ["commentId", "DESC"]],
//             attributes: {
//                 exclude: ["postId", "deletedAt"]
//             },
//             include: {
//                 model: Users,
//                 attributes: ["nickname"]
//             }
//         });
//     },

//     updateOne: async(comment) => {
//         return await Comments.update({
//             comment: comment.comment
//         }, {
//             where: { commentId: comment.commentId }
//         });
//     },

//     deleteOne: async(ids) => {
//         return await Comments.destroy({
//             where: { commentId: ids.commentId, userId: ids.userId }
//         });
//     }
// }