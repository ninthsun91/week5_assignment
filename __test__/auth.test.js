import jwt from "../utils/jwt.js";
import auth from "../middlewares/auth.js";


describe('jwt 모듈 테스트', () => {
    const payload = {
        userId: 1,
        nickname: 'qwe',
    }
    let token = undefined;

    test('jwt.sign 토큰 생성 성공 시 문자열 반환', () => {
        token = jwt.sign(payload);

        expect(typeof token === 'string').toBeTruthy();
    });

    test('jwt.verify 토큰 검사 성공 시 사용자 정보가 담긴 payload 반환', () => {
        const result = jwt.verify(token);

        expect(result.userId).toBe(1);
        expect(result.nickname).toBe('qwe');
    });

    test('jwt.verify 토큰 검사 실패 시 null 반환', () => {
        const result = jwt.verify('random token string');

        expect(result).toBeFalsy();
    });


    token = undefined;
    test('jwt.refresh 토큰 생성 시 문자열 반환', () => {
        token = jwt.refresh();

        expect(typeof token === 'string').toBeTruthy();
    });

    test('jwt.verify refresh 토큰 검사 성공시 {} 반환', () => {
        const result = jwt.verify(token);

        expect(result instanceof Object).toBeTruthy();
    });

});


describe('authMiddleware 테스트', () => {
    const payload = {
        userId: 1,
        nickname: 'qwe'
    }
    const accessToken = jwt.sign(payload);
    const refreshToken = jwt.refresh();

    let req = {
        headers: {
            authorization: 'Bearer ' + accessToken,
            refreshtoken: refreshToken,
        },
        session: {
            [refreshToken]: payload
        },
        app: {
            locals: {
                
            }
        }
    }
    let res = {
        status: jest.fn(()=>res),
        json: jest.fn(()=>res),
        set: jest.fn(),
        statusCode: undefined,
        temp: {}
    };
    const next = jest.fn()

    test('인증 통과 시 next() 호출. accessToken, refreshToken 둘 다 유효', () => {
        auth.authMiddleware(req, res, next)
        const localPayload = req.app.locals.user

        expect(localPayload.userId).toBe(1);
        expect(localPayload.nickname).toBe('qwe');
        expect(res.set).toBeCalledTimes(1);
        expect(next).toBeCalledTimes(1);  
    });

    test('인증 통과 시 next() 호출. refreshToken만 유효', ()=>{
        req.headers.authorization = 'Bearer randomAccessToken';

        auth.authMiddleware(req, res, next)
        const localPayload = req.app.locals.user;

        expect(localPayload.userId).toBe(1);
        expect(localPayload.nickname).toBe('qwe');
        expect(next).toBeCalled();
    });

    test('Bearer Auth 타입이 아니라면 에러', () => {
        req.headers.authorization = 'token randomAccessToken';
        
        auth.authMiddleware(req, res, next);
  
        expect(next).toBeCalled();    
    });

    test('refreshToken 검사 실패 시 에러', () => {
        req.headers.refreshtoken = 'randomRefreshToken';
        auth.authMiddleware(req, res, next);

        expect(next).toBeCalled();
    });

    test('헤더 누락 시 에러', () => {
        req = {
            session: {
                [refreshToken]: payload
            },
            app: {
                locals: {
                    
                }
            }
        }
        auth.authMiddleware(req, res, next);

        expect(next).toBeCalled();
    });
    
    test('세션에서 유저정보를 찾지 못하면 에러', () => {
        req.session = {
            'random token': payload
        }
        auth.authMiddleware(req, res, next);

        expect(next).toBeCalled();
    });
});


describe('tokenChecker 테스트', () => {
    const payload = {
        userId: 1,
        nickname: 'qwe'
    }
    const accessToken = jwt.sign(payload);
    const refreshToken = jwt.refresh();
    const expectError = {
        message: "로그인이 필요한 기능입니다."
    }


    let req = {
        headers: {
            authorization: 'Bearer ' + accessToken,
            refreshtoken: refreshToken,
        },
    }
    let res = {
        status: jest.fn(()=>res),
        json: jest.fn(()=>res),
    };
    const next = jest.fn()

    test('토큰 둘 다 있으면 에러', () => {
        auth.tokenChecker(req, res, next);

        expect(next).toBeCalled();
    });

    test('토큰 중 하나라도 없으면 next() 호출', () => {
        req.headers = {
            authorization: 'Broken'
        }
        auth.tokenChecker(req, res, next);

        expect(next).toBeCalled();
    });
});