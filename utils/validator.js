import Joi from "joi";


export default {
    signupSchema: Joi.object({
        nickname: Joi.string().min(3).alphanum().required(),
        password: Joi.string().min(4).required(),
        confirm: Joi.string().min(4).required()
    }),
    signinSchema: Joi.object({
        nickname: Joi.string().min(3).alphanum().required(),
        password: Joi.string().min(4).required(),
    }),

    postSchema: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required()
    }),
    postEditSchema: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required()
    }),
    
    commentSchema: Joi.object({
        comment: Joi.string().required(),
    }),
    commentEditSchema: Joi.object({
        comment: Joi.string().required(),
    }),
}