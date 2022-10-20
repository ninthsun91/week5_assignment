jest.mock('../../../services/comment.js', ()=>{
    return {
        __esmodule: true,
        createOne: jest.fn((comment)=>{
            const keys = Object.keys(comment).length;

            if (keys !== 3) return false;
            return true;
        }),
        findAll: jest.fn((postId)=>{
            if (postId !== 1) return [ ];
            return commentList;
        }),
        updateOne: jest.fn((comment)=>{
            const { commentId, userId } = comment;

            if (commentId===1 && userId===1) return [1];
            return [null];
        }),
        deleteOne: jest.fn((ids)=>{
            const { commentId, userId } = ids;

            if (commentId===1 && userId===1) return 1;
            return null;
        }),
    }
});

import Comment from '../../../api/controllers/comment.js';
import CommentService from '../../../services/comment.js';

let mockReq = {};
let mockRes = {};
let mockNext = jest.fn();

beforeEach(()=>{
    mockReq = {};
    mockRes = {
        status: jest.fn(()=>mockRes),
        json: jest.fn()
    }
});

describe('Test createOne', () => {
    
    test('should return status code 200 & json message if data created', async () => {
        mockReq = {
            body: { comment: 'test comment' },
            params: { postId: 1 },
            app: {
                locals: {
                    user: { userId: 1 }
                }
            }
        };
        await Comment.createOne(mockReq, mockRes, mockNext);

        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalled();
    });

    test('should call next if wrong comment data is given', async () => {
        mockReq = {
            body: { },
            params: { postId: 1 },
            app: {
                locals: {
                    user: { userId: 1 }
                }
            }
        };
        await Comment.createOne(mockReq, mockRes, mockNext);

        expect(mockNext).toBeCalledTimes(1);
    });
});

describe('Test getCommentList', ()=>{

    test('should return array of comments if success', async()=>{
        mockReq = {
            params: { postId: 1 },
        };
        mockRes = {
            status: jest.fn(()=>mockRes),
            json: jest.fn((val)=>mockRes.jsonData=val)
        }
        await Comment.getCommentList(mockReq, mockRes, mockNext);
        const { data } = mockRes.jsonData;

        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalled();
        expect(Array.isArray(data)).toBeTruthy();
    });
});

describe('Test updateOne', () => {
    
    test('should return status 200 and json message if successfully updated', async () => {
        mockReq = {
            body: { comment: 'test comment' },
            params: { commentId: 1 },
            app: {
                locals: {
                    user: { userId: 1 }
                }
            }
        };
        await Comment.updateOne(mockReq, mockRes, mockNext);

        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalledWith({ message: '댓글을 수정했습니다.' });
    });
    
    test('should call next if either userId or commentId does not match', async () => {
        mockReq = {
            body: { comment: 'test comment' },
            params: { commentId: 1 },
            app: {
                locals: {
                    user: { userId: 2 }
                }
            }
        };
        await Comment.updateOne(mockReq, mockRes, mockNext);

        expect(mockNext).toBeCalled();
    });
});

describe('Test deleteOne', () => {
    
    test('should return status 200 and json message if successfully deleted', async () => {
        mockReq = {
            params: { commentId: 1 },
            app: {
                locals: {
                    user: { userId: 1 }
                }
            }
        };
        await Comment.deleteOne(mockReq, mockRes, mockNext);

        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalledWith({ message: "댓글을 삭제했습니다." });
    });
    
    test('should call next if either userId or commentId does not match', async () => {
        mockReq = {
            params: { commentId: 1 },
            app: {
                locals: {
                    user: { userId: 2 }
                }
            }
        };
        await Comment.deleteOne(mockReq, mockRes, mockNext);

        expect(mockNext).toBeCalled();
    });
});

const commentList = [
    { 
        commentId: 1,
        userId: 1,
        comment: 'test comment',
        createdAt: '2022-10-19',
        updatedAt: '2022-10-19',
        User: { nickname: 'jest' }
    }, { 
        commentId: 2,
        userId: 1,
        comment: 'test comment2',
        createdAt: '2022-10-19',
        updatedAt: '2022-10-19',
        User: { nickname: 'jest' }
    }, { 
        commentId: 3,
        userId: 2,
        comment: 'test comment3',
        createdAt: '2022-10-19',
        updatedAt: '2022-10-19',
        User: { nickname: 'test' }
    }, { 
        commentId: 4,
        userId: 3,
        comment: 'test comment4',
        createdAt: '2022-10-19',
        updatedAt: '2022-10-19',
        User: { nickname: 'super' }
    }
]