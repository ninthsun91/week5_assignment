import { errorHandler, errorLogger } from "../middlewares/errorHandler";
import { InvalidParamsError, InternalError } from "../utils/httpException";

describe('errorMiddleware Test', ()=>{
    const mockReq = {};
    const mockRes = {
        status: jest.fn(()=>mockRes),
        json: jest.fn()
    }
    const mockNext = jest.fn();

    test('should call next if error passed to errorLogger', ()=>{
        const paramsError = new InvalidParamsError('params error', 400);
        errorLogger(paramsError, mockReq, mockRes, mockNext);

        expect(mockNext).toBeCalledTimes(1);
        expect(mockNext).toBeCalledWith(paramsError);
    });

    test('should return statusCode and error message if triggered', () => {
        const internalError = new InternalError('internal error', 500);
        errorHandler(internalError, mockReq, mockRes, mockNext);

        expect(mockRes.status).toBeCalledWith(500);
        expect(mockRes.json).toBeCalledWith({ message: internalError.message });
    });
});