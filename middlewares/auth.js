import jwt from "../utils/jwt.js";


export function authMiddleware(req, res, next) {
    console.log("AUTHMIDDLEWARE");

    const invalidError = new Error("로그인이 필요합니다.");
    try {
        const { authorization, refreshtoken } = req.headers;
        if (authorization === undefined) {
            throw invalidError;
        }
        const [tokenType, accessToken] = authorization.split(" ");
        if (tokenType !== "Bearer") {
            throw invalidError;
        }
    
        const payload = jwt.verify(accessToken);
        console.log(payload);
        if (payload === null) {
            console.log("INVALID ACCESSTOKEN");
    
            const refreshCheck = jwt.refreshVerify(refreshtoken);
            if (refreshCheck === null) {
                throw invalidError;
            }
            const payload = req.session[refreshtoken];
            const newAccessToken = jwt.sign(JSON.parse(payload));
    
            res.set("Authorization", "Bearer "+ newAccessToken);
            return next();
        } else {
            console.log("VALID ACCESSTOKEN");
            res.set("Authorization", "Bearer "+ accessToken);
            return next();
        }
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export function tokenChecker(req, res, next) {
    console.log("TOKENCHECKER");

    const { authorization, refreshtoken } = req.headers;
    if ( authorization && refreshtoken ) {
        const error = new Error("이미 로그인이 되어있습니다.");
        return res.status(400).json({
            message: error.message
        });
    }
    return next();
}


function invalidError() {
    
}