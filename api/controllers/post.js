import * as Post from "../../db/queries/post.js";
import joi from "../../utils/validator.js";


export async function createOne(req, res, next) {
    console.log("POST CONTROLLER CREATEONE");

    const { title, content } 
        = await joi.postSchema.validateAsync(req.body);
    const { userId } = req.app.locals.user;
    const post = {
        userId, title, content
    }

    try {
        await Post.createOne(post);
    
        res.status(200).json({
            message: "게시글을 작성했습니다."
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}

export async function findAll(req, res, next) {
    console.log("POST CONTROLLER FINDALL");
    try {
        res.status(200).json({
            data: await Post.findAll()
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}

export async function findOne(req, res, next) {
    console.log("POST CONTROLLER FINDONE");

    const { postId } = req.params;

    const post = await Post.findOne(postId);
    if (post === null) {
        const error = new Error("POST NOT FOUND");
        return res.status(400).json({
            message: error.message
        });
    }
    res.status(200).json({
        data: post
    });
}

export async function updateOne(req, res, next) {
    console.log("POST CONTROLLER UPDATEONE");

    try {
        const { title, content }
            = await joi.postEditSchema.validateAsync(req.body);
        const post = {
            postId: req.params.postId,
            userId: req.app.locals.userId,
            title, content
        }

        const result = await Post.updateOne(post);
        if (result[0] === 0) {
            throw new Error("UPDATE FAIL");
        }

        res.status(200).json({
            message: "게시글을 수정했습니다."
        });
        
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export async function deleteOne(req, res, next) {
    console.log("POST CONTROLLER DELETEONE");
    const { postId } = req.params;
    
    const result = await Post.deleteOne(postId);
    if (result === 0) {
        const error = new Error("DELETE FAIL");
    }

    res.status(200).json({
        message: "게시글을 삭제했습니다."
    });
}

export async function toggleLike(req, res, next) {
    console.log("POST CONTROLLER TOGGLELIKE");
}

export async function likeList(req, res, next) {
    console.log("POST CONTROLLER LIKELIST");
}