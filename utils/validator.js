import Joi from "joi";



export default {
    signupSchema: Joi.object({
        nickname: Joi.string().min(3).alphanum().required()
            .error(new Error("닉네임은 최소 3자 이상, 알파벡 대소문자(a~z, A~Z), 숫자(0~9)로 구성되어야 합니다.")),
        password: Joi.string().min(4).required()
            .error(new Error("비밀번호는 최소 4자 이상이어야 합니다.")),
        confirm: Joi.string().min(4).required()
            .error(new Error("비밀번호는 최소 4자 이상이어야 합니다.")),
    }),
    signinSchema: Joi.object({
        nickname: Joi.string().min(3).alphanum().required()
            .error(new Error("닉네임이 올바르지 않습니다.")),
        password: Joi.string().min(4).required()
            .error(new Error("비밀번호가 올바르지 않습니다.")),
    }),

    postSchema: Joi.object({
        title: Joi.string().required()
            .messages({
                "string.empty": "제목을 입력해주세요."
            }),
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