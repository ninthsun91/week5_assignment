import * as Comment from "../../db/queries/comment.js";
import joi from "../../utils/validator.js";

export async function createOne(req, res, next) {
    console.log("CONTROLLER CREATEONE");
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

}

export async function getCommentList(req, res, next) {
    console.log("GET COMMENTLIST BY POSTID");
    const { postId } = req.params;
    const commentList = await Comment.findAll(postId);

    res.status(200).json({
        data: commentList,
    });
}

export async function updateOne(req, res, next) {
    console.log("CONTROLLER UPDATEONE");
    try {
        const { commentId } = req.params;
        const { comment }
            = await joi.commentEditSchema.validateAsync(req.body);
        
        const result = await Comment.updateOne({ 
            commentId, comment 
        });
        if (result[0] === 0) {
            throw new Error("UPDATE FAIL");
        }
    
        res.status(200).json({
            message: "댓글을 수정했습니다."
        });
        
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export async function deleteOne(req, res, next) {
    console.log("CONTROLLER DELETEONE");
    try {
        const { commentId } = req.params;
        console.log(commentId);
        
        const result = await Comment.deleteOne(commentId);
        console.log(result);
        if (result === 0) {
            throw new Error("DELETE FAIL");
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