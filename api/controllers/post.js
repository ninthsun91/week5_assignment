import * as Post from "../../db/queries/post.js";
import joi from "../../utils/validator.js";


export async function createOne(req, res, next) {
    const { title, content } 
        = await joi.postSchema.validateAsync(req.body);
    const { userId } = req.app.locals.user;
    const post = {
        userId, title, content
    };

    try {
        await Post.createOne(post);
    
        res.status(200).json({
            message: "게시글을 작성했습니다."
        });
        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message
        });
    }
}

export async function findAll(req, res, next) {
    try {
        const postList = await Post.findAll();
        const data = postList.map((post)=>{
            return {
                postId: post.postId,
                userId: post.userId,
                nickname: post.User.nickname,
                title: post.title,
                likes: post.likes,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            };
        });

        res.status(200).json({
            data
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}

export async function findOne(req, res, next) {
    if (req.path === "/like") return next();

    const { postId } = req.params;

    const post = await Post.findOne(postId);
    if (post === null) {
        const error = new Error("POST NOT FOUND");
        return res.status(400).json({
            message: error.message
        });
    }

    res.status(200).json({
        data: {
            postId: post.postId,
            userId: post.userId,
            nickname: post.User.nickname,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }
    });
}

export async function updateOne(req, res, next) {
    try {
        const { title, content }
            = await joi.postSchema.validateAsync(req.body);
        const post = {
            postId: req.params.postId,
            userId: req.app.locals.user.userId,
            title, content
        };

        const result = await Post.updateOne(post);
        switch (result[0]) {
            case null:
                const authError = new Error("수정 권한이 없습니다");
                return res.status(401).json({
                    message: authError.message
                });
            case 0:
                const internalError = new Error("INTERNAL UPDATE FAILURE");
                return res.status(500).json({
                    message: internalError.message
                });
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
    const { userId } = req.app.locals.user;
    const { postId } = req.params;
    
    try {
        const result = await Post.deleteOne({ userId, postId });
        switch (result) {
            case null:
                const authError = new Error("삭제 권한이 없습니다.");
                return res.status(401).json({
                    message: authError.message
                });
            case 0:
                const internalError = new Error("INTERNAL DELETE FAILURE");
                return res.status(500).json({
                    message: internalError.message
                });
        }
    
        res.status(200).json({
            message: "게시글을 삭제했습니다."
        });
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function toggleLike(req, res, next) {

    const { postId } = req.params;
    const { userId } = req.app.locals.user;

    try {
        const result = await Post.toggleLike({ postId, userId });
        if (result === "add") {
            res.status(200).json({
                message: "게시글의 좋아요를 등록했습니다."
            });
        } else if (result === "delete") {
            res.status(200).json({
                message: "게시글의 좋아요를 취소했습니다."
            });
        }
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function likeList(req, res, next) {
    const { userId } = req.app.locals.user;
    
    const likeList = await Post.findLikes(userId);
    const data = likeList.map((like)=>{
        return {
            postId: like.Post.postId,
            userId: like.Post.userId,
            nickname: like.Post.User.nickname,
            title: like.Post.title,
            createdAt: like.Post.createdAt,
            updatedAt: like.Post.updatedAt
        }
    });

    res.status(200).json({
        data
    });
}