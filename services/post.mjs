import PostRepository from "../database/repositories/post.mjs";


export default class PostService {
    Post = new PostRepository();

    createOne = async(post) => {
        return await this.Post.createOne(post);
    }

    findAll = async() => {
        const result = await this.Post.findAll();
        const postList = result.map((post)=>{
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

        return postList;
    }

    findOne = async(postId) => {
        const post = await this.Post.findOne(postId);

        if (post === null) throw new Error("POST NOT FOUND");

        return {
            postId: post.postId,
            userId: post.userId,
            nickname: post.User.nickname,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }
    }

    updateOne = async(post) => {
        const check = await this.Post.findOne(post.postId);

        if (check === null || (check.get().userId !== post.userId)) return [null];
        return await this.Post.updateOne(post);
    }

    deleteOne = async(ids) => {
        const check = await this.Post.findOne(ids.postId);
        
        if (check === null || (check.get().userId !== ids.userId)) return null;
        return this.Post.deleteOne(ids);
    }
    
    toggleLike = async(ids) => {
        const check = await this.Post.findLike(ids);
        
        if (check === null) return await this.Post.addLike(ids);
        return await this.Post.deleteLike(ids);
    }

    likeList = async(userId) => {
        const result = await this.Post.findLikes(userId);
        const likeList = result.map((like)=>{
            return {
                postId: like.Post.postId,
                userId: like.Post.userId,
                nickname: like.Post.User.nickname,
                title: like.Post.title,
                createdAt: like.Post.createdAt,
                updatedAt: like.Post.updatedAt
            }
        });

        return likeList;
    }
}