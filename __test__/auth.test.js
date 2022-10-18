import jwt from "../utils/jwt.js";


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

        expect(result).toBe({});
    });

});