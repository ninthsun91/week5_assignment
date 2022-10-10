import Joi from "joi";


export default {
    signupSchema: Joi.object({}),
    signinSchema: Joi.object({}),

    postSchema: Joi.object({}),
    postEditSchema: Joi.object({}),
    
    commentSchema: Joi.object({}),
    commentEditSchema: Joi.object({}),
}