import jwt from "jsonwebtoken";
import env from "../config.env.js";


export default {
    sign: (payload)=>{
        console.log("SIGN ACCESSTOKEN");
        return jwt.sign(payload, env.JWT_KEY, {
            algorithm: "HS256",
            expiresIn: 60,
        });
    },
    verify: (accessToken)=>{
        console.log("VERIFY ACCESSTOKEN");

        try {
            const payload = jwt.verify(accessToken, env.JWT_KEY);
            return payload;            
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    refresh: ()=>{
        console.log("SIGN REFRESHTOKEN");
        return jwt.sign({}, env.JWT_KEY, {
            algorithm: "HS256",
            expiresIn: 60*60*24,
        });
    },
    refreshVerify: function(refreshToken, userId) {
        console.log("VERIFY REFRESHTOKEN");
    }
}