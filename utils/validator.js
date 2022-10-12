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
            .messages({
                "string.empty": "게시글 내용을 입력해주세요."
            }),
    }),
    
    commentSchema: Joi.object({
        comment: Joi.string().required()
            .messages({
                "string.empty": "댓글 내용을 입력해주세요."
            }),
    }),
}