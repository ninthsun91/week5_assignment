jest.mock('../../../database/models/comment.js');

import Comment from '../../../api/controllers/comment.js';
import Comments from '../../../database/models/comment.js';

let mockReq = {
    body: {
        comment: 'test comment'
    },
    params: {
        postId: 1,
        commentId: 1,
    },
    app: {
        locals: {
            user: { userId: 1 }
        }
    }
};
let mockRes = {
    status: jest.fn(()=>mockRes),
    json: jest.fn((arg)=>mockRes.jsonData = arg),
};
const mockNext = jest.fn();
afterEach(()=>{
    mockRes = {
        status: jest.fn(()=>mockRes),
        json: jest.fn((arg)=>mockRes.jsonData = arg),
    };
    mockReq = {
        body: {
            comment: 'test comment'
        },
        params: {
            postId: 1,
            commentId: 1,
        },
        app: {
            locals: {
                user: { userId: 1 }
            }
        }
    };
});

describe('Test createOne', () => {
    Comments.create = jest.fn((comment)=>{
        const keys = Object.keys(comment).length;

        if (keys !== 3) return false;
        return true;
    });

    test('should return status code 200 & json message if data created', async () => {
        await Comment.createOne(mockReq, mockRes, mockNext);

        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalledWith({ message: '댓글을 작성했습니다.' });
    });

    test('should call next if wrong comment data is given', async () => {
        mockReq.body = {};
        await Comment.createOne(mockReq, mockRes, mockNext);

        expect(mockNext).toBeCalledTimes(1);
    });
});

describe('Test getCommentList', ()=>{
    Comments.findAll = jest.fn((options)=>{
        const postId = options.where.postId;
        switch (postId) {
            case 1:
                return commentList;        
            case 2:
                return [];
        }
    });

    test('should return array of comments if success', async()=>{
        await Comment.getCommentList(mockReq, mockRes, mockNext);
        const { data } = mockRes.jsonData;

        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalled();
        expect(Array.isArray(data)).toBeTruthy();
    });
});

describe('Test updateOne', () => {
    Comments.update = jest.fn((value, option)=>{
        const commentId = value.commentId

        return commentId === 1? [ 1 ] : [null];
    });
    Comments.findByPk = jest.fn((commentId)=>{
        if (commentId !== 1) return null;
        return {
            get: ()=>{
                return { userId: 1 }
            }
        };
    });
    
    // mockRes = Object.assign(mockRes, { check: { get: ()=>1 }})

    // test('should return status 200 and json message if successfully updated', async () => {
    //     console.log('REEEEEEEEEEEEEEEEQ: ', mockReq);
    //     await Comment.updateOne(mockReq, mockRes, mockNext);

    //     expect(mockRes.json).toEqual({
    //         get: ()=>{
    //             return { userId: 1 }
    //         }
    //     })

    //     // console.log(mockRes.check.get().userId);
    //     // expect(mockNext).toBeCalledTimes(0);
    //     // expect(mockRes.status).toBeCalledWith(200);
    //     // expect(mockRes.jsonData).toEqual({ message: '댓글을 수정했습니다.' });
    // });
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