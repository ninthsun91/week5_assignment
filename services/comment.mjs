import Comment from "../database/repositories/comment.mjs";


export default {
    createOne: async(comment) => {
        return await Comment.createOne(comment);
    },

    findAll: async(postId) => {
        const result = await Comment.findAll(postId);
        const commentList = result.map((comment)=>{
            return {
                commentId: comment.commentId,
                userId: comment.userId,
                nickname: comment.User.nickname,
                comment: comment.comment,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
            };
        });

        return commentList;
    },

    updateOne: async(comment) => {
        const check = await Comment.findOne(comment.commentId);

        if (check === null || (check.get().userId !== comment.userId)) return [ null ];
        return await Comment.updateOne(comment);
    },

    deleteOne: async(ids) => {
        const check = await Comment.findOne(ids.commentId);

        if (check === null || (check.get().userId !== ids.userId)) return null;
        return await Comment.deleteOne(ids);
    }
}