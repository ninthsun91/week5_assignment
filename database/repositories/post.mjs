import { models } from "../config.mjs";

const { Users, Posts, Likes } = models;


export default class PostRepository {
    createOne = async(post) => {
        return await Posts.create(post);
    }
    
    findAll = async() => {
        return await Posts.findAll({
            order: [["createdAt", "DESC"], ["postId", "DESC"]],
            include: {
                model: Users,
                attributes: ["nickname"]
            }
        });
    }
    
    findOne = async(postId) => {
        return await Posts.findByPk(postId, {
            include: {
                model: Users,
                attributes: ["nickname"]
            }
        });
    }
    
    updateOne = async(post) => {
        return await Posts.update(post, {
            where: { postId: post.postId, userId: post.userId }
        });
    }
    
    deleteOne = async(ids) => {
        return await Posts.destroy({
            where: { postId: ids.postId, userId: ids.userId }
        });
    }
    
    findLike = async(ids) => {
        return await Likes.findOne({
            where: { postId: ids.postId, userId: ids.userId }
        });
    }
    
    addLike = async(ids) => {
        await Likes.create({ postId: ids.postId, userId: ids.userId });
        await Posts.increment({"likes": 1}, {where: { postId: ids.postId }});
        return "add";
    }
    
    deleteLike = async(ids) => {
        await Likes.destroy({
            where: { postId: ids.postId, userId: ids.userId }
        });
        await Posts.increment({"likes": -1}, {where: { postId: ids.postId }});
        return "delete";
    }
    
    findLikes = async(userId) => {
        return await Likes.findAll({
            where: { userId },
            attributes: ["likeId", "postId"],
            include: {
                model: Posts,
                attributes: {
                    exclude: ["content"]
                },
                include: {
                    model: Users,
                    attributes: ["nickname"]
                }
            },
            order: [[Posts, "likes", "DESC"], [Posts, "updatedAt", "DESC"]]
        });
    }
    
    countLikes = async(postId) => {
        return await Likes.count({
            where: { postId },
        });
    }
}