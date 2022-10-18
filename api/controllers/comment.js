import Comment from "../../services/comment.js"
import joi from "../../utils/validator.js";


export default {
    createOne: async(req, res, next) => {
        try {
            const { comment }
                = await joi.commentSchema.validateAsync(req.body);
        
            const doc = { 
                postId: req.params.postId,
                userId: req.app.locals.user.userId, 
                comment 
            }
            await Comment.createOne(doc);
        
            res.status(200).json({
                message: "댓글을 작성했습니다."
            });
            
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }    
    },
    
    getCommentList: async(req, res, next) => {
        const { postId } = req.params;
        
        res.status(200).json({
            data: await Comment.findAll(postId)
        });
    },
    
    updateOne: async(req, res, next) => {
        try {
            const { userId } = req.app.locals.user;
            const { commentId } = req.params;
            const { comment }
                = await joi.commentSchema.validateAsync(req.body);
            
            const result = await Comment.updateOne({ commentId, userId, comment });
            switch (result[0]) {
                case null:
                    throw new Error("수정 권한이 없습니다.");
                case 0:
                    throw new Error("INTERNAL UPDATE FAILURE");
            }
        
            res.status(200).json({
                message: "댓글을 수정했습니다."
            });
            
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    },
    
    deleteOne: async(req, res, next) => {
        try {
            const { userId } = req.app.locals.user;
            const { commentId } = req.params;
            
            const result = await Comment.deleteOne({ userId, commentId });
            switch (result) {
                case null:
                    throw new Error("삭제 권한이 없습니다.");
                case 0:
                    throw new Error("INTERNAL DELETE FAILURE");
            }
        
            res.status(200).json({
                message: "댓글을 삭제했습니다."
            });
            
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
}
