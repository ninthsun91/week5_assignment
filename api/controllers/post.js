import PostService from "../../services/post.js";
import joi from "../../utils/validator.js";


export default class PostController {
    Post = new PostService();

    createOne = async(req, res, next) => {
        const { title, content } 
            = await joi.postSchema.validateAsync(req.body);
        const { userId } = req.app.locals.user;
        const post = {
            userId, title, content
        };
    
        try {
            await this.Post.createOne(post);
        
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
    
    findAll = async(req, res, next) => {
        try {
            res.status(200).json({
                data: await this.Post.findAll()
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message
            });
        }
    }
    
    findOne = async(req, res, next) => {
        if (req.path === "/like") return next();
    
        try {
            const { postId } = req.params;    
            const data = await this.Post.findOne(postId);
        
            res.status(200).json({ data });
            
        } catch (error) {
            res.status(400).json({
                message: error.message
            });            
        }

    }
    
    updateOne = async(req, res, next) => {
        try {
            const { title, content }
                = await joi.postSchema.validateAsync(req.body);
            const post = {
                postId: req.params.postId,
                userId: req.app.locals.user.userId,
                title, content
            };
    
            const result = await this.Post.updateOne(post);
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
    
    deleteOne = async(req, res, next) => {
        const { userId } = req.app.locals.user;
        const { postId } = req.params;
        
        try {
            const result = await this.Post.deleteOne({ userId, postId });
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
    
    toggleLike = async(req, res, next) => {
    
        const { postId } = req.params;
        const { userId } = req.app.locals.user;
    
        try {
            const result = await this.Post.toggleLike({ postId, userId });
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
    
    likeList = async(req, res, next) => {
        const { userId } = req.app.locals.user;
    
        res.status(200).json({
            data: this.Post.likeList(userId)
        });
    }
}
