import jwt from "../utils/jwt.js";


export default {
    authMiddleware: (req, res, next) => {
        const invalidError = new Error("로그인이 필요한 기능입니다.");
    
        try {
            const { Authorization, refreshToken } = req.headers;
            if (Authorization === undefined) throw invalidError;
    
            const [tokenType, accessToken] = Authorization.split(" ");
            if (tokenType !== "Bearer") throw invalidError;
        
            const payload = jwt.verify(accessToken);
            if (payload === null) {
                console.log("INVALID ACCESSTOKEN");

                const refreshCheck = jwt.verify(refreshToken);
                if (refreshCheck === null) throw invalidError;
                
                const payload = req.session[refreshToken];
                if (payload === undefined) throw invalidError;
                
                req.app.locals.user = payload;
                const newAccessToken = jwt.sign(JSON.parse(payload));
                
                res.set("Authorization", "Bearer "+ newAccessToken);
                return next();
            } else {
                req.app.locals.user = payload;
                res.set("Authorization", "Bearer "+ accessToken);
                return next();
            }
            
        } catch (error) {
            res.status(401).json({
                message: error.message
            });
        }
    },
    
    tokenChecker: (req, res, next) => {
        const { Authorization, refreshToken } = req.headers;
        
        if (Authorization && refreshToken) {
            const error = new Error("이미 로그인이 되어있습니다.");
            return res.status(400).json({
                message: error.message
            });
        }
    
        return next();
    },    

    // tempAuth: (req, res, next) => {
    //     const key = req.query.id;
    //     switch (Number(key)) {
    //         case 1:
    //             req.app.locals.user = { userId: 1, nickname: "BOSS" };
    //             break;
    //         case 2:
    //             req.app.locals.user = { userId: 2, nickname: "root" };
    //             break;
    //         case 3:
    //             req.app.locals.user = { userId: 3, nickname: "mysql" };
    //             break;
    //         case 4:
    //             req.app.locals.user = { userId: 4, nickname: "test" };
    //             break;
    //         case 5:
    //             req.app.locals.user = { userId: 5, nickname: "sparta" };
    //             break;
    //     }
        
    //     return next();
    // }
}
