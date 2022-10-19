jest.mock('../../../database/repositories/comment.js');

import Comment from '../../../services/comment.js';
import CommentRepo from '../../../database/repositories/comment.js';


let comment = {
    userId: 1,
    postId: 1,
    content: 'test content'
};

let fakeComment = {
    userId: 2,
    postId: 1,
    comment: 'fake comment'
};

describe('Test createOne', () => {
    CommentRepo.createOne = jest.fn((comment)=>{
        const keys = Object.keys(comment).length;

        switch (keys) {
            case 3:
                return true;
            default:
                return false;
        }
    });

    test('should return true if valid call', async () => {
        const result = await Comment.createOne(comment);

        expect(CommentRepo.createOne).toBeCalledWith(comment);
        expect(result).toBe(true);
    });

    test('should return false if comment doesn\'t have enough keys', async () => {
        fakeComment = {
            postId: 1,
            comment: 'fake comment'
        };
        const result = await Comment.createOne(fakeComment);

        expect(CommentRepo.createOne).toBeCalledWith(fakeComment);
        expect(result).toBe(false);
    });
    
});


describe('updateOne test', () => {
    CommentRepo.findOne = jest.fn((commentId)=>{
        if (commentId !== 1) return null

        return {
            get: ()=>{
                return { userId: 1 }
            }
        }
    });
    CommentRepo.updateOne = jest.fn((comment)=>{
        if (comment.commentId === 1) return [ 1 ];
        return [ null ];
    })
    comment = {
        commentId: 1,
        userId: 1,
        comment: 'updated'
    }
    test('should return [1] if success', async () => {
        const result = await Comment.updateOne(comment);

        expect(result).toEqual([ 1 ]);
    });
    test('should return null if no comment match', async()=>{
        comment.commentId = 2;
        const result = await Comment.updateOne(comment);

        expect(result).toEqual([null]);
    });
});