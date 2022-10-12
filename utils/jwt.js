import jwt from "jsonwebtoken";
import env from "../config.env.js";


export default {
    sign: (payload)=>{
        console.log("SIGN ACCESSTOKEN");
        return jwt.sign(payload, env.JWT_KEY, {
            algorithm: "HS256",
            expiresIn: 60*10,
        });
    },
    verify: (accessToken)=>{
        console.log("VERIFY ACCESSTOKEN");

        try {
            const payload = jwt.verify(accessToken, env.JWT_KEY);
            return payload;            
        } catch (error) {
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
    refreshVerify: function(refreshToken) {
        console.log("VERIFY REFRESHTOKEN");
        return this.verify(refreshToken);
    }
}