import bcrypt from "bcrypt";
import jwt from "../../utils/jwt.js";
import joi from "../../utils/validator.js";
import * as User from "../../db/queries/user.js";
import env from "../../config.env.js";


export async function signup(req, res, next) {
    try {
        const { nickname, password, confirm } 
            = await joi.signupSchema.validateAsync(req.body);

        if (password.includes(nickname)) throw new Error("닉네임을 비밀번호에 쓸 수 없습니다.");
        if (password !== confirm) throw new Error("비밀번호가 일치하지 않습니다.");

        const user = {
            nickname,
            password: await bcrypt.hash(password, env.SALT_ROUND)
        }
        const result = await User.createOne(user);

        if (result instanceof Error) throw result;
        if (!result.isNewRecord) throw new Error("중복된 닉네임입니다.");
    
        res.status(200).json({
            message: "회원가입에 성공하였습니다.",
        });
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function singin(req, res, next) {
    try {
        const { nickname, password } 
            = await joi.signinSchema.validateAsync(req.body);

        const user = await User.findOne(nickname);
        if (user===null || !(await bcrypt.compare(password, user.password))) {
            throw new Error("닉네임 또는 패스워드를 확인해주세요.");
        }

        const payload = {
            userId: user.userId,
            nickname
        }
        const accessToken = jwt.sign(payload);
        const refreshToken = jwt.refresh();
        req.session[refreshToken] = JSON.stringify(payload);

        res.status(200).set({
            Authorization: "Bearer " + accessToken, 
            refreshToken
        }).json({
            message: "로그인되었습니다."
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}