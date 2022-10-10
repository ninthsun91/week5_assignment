import jwt from "jsonwebtoken";


export default {
    sign: (payload)=>{
        console.log("SIGN ACCESSTOKEN");
    },
    verify: (accessToken)=>{
        console.log("VERIFY ACCESSTOKEN");
    },
    refresh: ()=>{
        console.log("SIGN REFRESHTOKEN");
    },
    refreshVerify: function(refreshToken, userId) {
        console.log("VERIFY REFRESHTOKEN");
    }
}