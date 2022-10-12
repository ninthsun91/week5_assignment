import jwt from "../utils/jwt.js";


export function authMiddleware(req, res, next) {
    const invalidError = new Error("로그인이 필요한 기능입니다.");

    try {
        const { authorization, refreshtoken } = req.headers;
        if (authorization === undefined) throw invalidError;

        const [tokenType, accessToken] = authorization.split(" ");
        if (tokenType !== "Bearer") throw invalidError;
    
        const payload = jwt.verify(accessToken);
        if (payload === null) {
            console.log("INVALID ACCESSTOKEN");
    
            const refreshCheck = jwt.refreshVerify(refreshtoken);
            if (refreshCheck === null) throw invalidError;

            const payload = req.session[refreshtoken];
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
}

export function tokenChecker(req, res, next) {
    const { authorization, refreshtoken } = req.headers;
    
    if (authorization && refreshtoken) {
        const error = new Error("이미 로그인이 되어있습니다.");
        return res.status(400).json({
            message: error.message
        });
    }

    return next();
}


export function tempAuth(req, res, next) {
    const key = req.query.id;
    switch (Number(key)) {
        case 1:
            req.app.locals.user = { userId: 1, nickname: "BOSS" };
            break;
        case 2:
            req.app.locals.user = { userId: 2, nickname: "root" };
            break;
        case 3:
            req.app.locals.user = { userId: 3, nickname: "mysql" };
            break;
        case 4:
            req.app.locals.user = { userId: 4, nickname: "test" };
            break;
        case 5:
            req.app.locals.user = { userId: 5, nickname: "sparta" };
            break;
    }
    
    return next();
}
