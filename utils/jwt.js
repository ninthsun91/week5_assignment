import jwt from "jsonwebtoken";
import env from "../config.env.js";


export default {
    sign: (payload)=>{
        return jwt.sign(payload, env.JWT_KEY, {
            algorithm: "HS256",
            expiresIn: 60*10,
        });
    },
    verify: (token)=>{
        try {
            const payload = jwt.verify(token, env.JWT_KEY);
            return payload;            
        } catch (error) {
            return null;
        }
    },
    refresh: ()=>{
        return jwt.sign({}, env.JWT_KEY, {
            algorithm: "HS256",
            expiresIn: 60*60*24,
        });
    }
}