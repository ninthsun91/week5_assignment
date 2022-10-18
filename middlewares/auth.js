import jwt from "../utils/jwt.js";
import { InvalidAccessError, InternalError } from "../utils/httpException.js";


export default {
    authMiddleware: (req, res, next) => {
        try {
            const { authorization, refreshtoken } = req.headers;
            if (authorization === undefined) 
                throw new InvalidAccessError();
    
            const [tokenType, accessToken] = authorization.split(" ");
            if (tokenType !== "Bearer") 
                throw new InvalidAccessError();
        
            const payload = jwt.verify(accessToken);
            if (payload === null) {
                console.log("INVALID ACCESSTOKEN");

                const refreshCheck = jwt.verify(refreshtoken);
                if (refreshCheck === null) 
                    throw new InvalidAccessError('유효하지 않은 refreshToken', 401);
                
                const payload = req.session[refreshtoken];
                if (payload === undefined) 
                    throw new InternalError();
                
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
            next(error)
        }
    },
    
    tokenChecker: (req, res, next) => {
        const { authorization, refreshtoken } = req.headers;
        
        try {
            if (authorization && refreshtoken) {
                throw new InvalidAccessError('이미 로그인이 되어있습니다.', 400);
            }
        
            return next();
        } catch (error) {
            next(error);
        }
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
