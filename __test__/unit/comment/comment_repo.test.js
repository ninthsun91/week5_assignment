jest.mock('../../../database/models/comment.js');

import Comment from '../../../database/repositories/comment.js';
import Comments from '../../../database/models/comment.js';


describe('Comment Repository 테스트', () => {
    let comment = {
        postId: 1,
        userId: 1,
        comment: 'comment test'
    };
    let commentId = 1;

    Comments.create = jest.fn((comment)=>{
        const keys = Object.keys(comment).length;

        if (keys !== 3) return false;
        return true;
    });
    Comments.findByPk = jest.fn((commentId)=>{
        switch (commentId) {
            case 1:
                return { 
                    commentId: 1,
                    postId: 1,
                    userId: 1,
                    comment: 'comment test',
                    createdAt: 'date string',
                    updatedAt: 'date string',
                };
        
            case 2:
                return null;
        }
    });
    Comments.findAll = jest.fn((options)=>{
        const postId = options.where.postId;
        switch (postId) {
            case 1:
                return [{ commentId: 1 }, { commentId: 2 }, { commentId: 3 }];
        
            case 2:
                return [];
        }
    });
    Comments.update = jest.fn((update, option)=>{
        const commentId = option.where.commentId;
        switch (commentId) {
            case 1:
                return [1];
            case 2:
                return [];
        }
    });
    Comments.destroy = jest.fn((option)=>{
        const { commentId, userId } = option.where;

        if (comment.userId === userId && comment.commentId === commentId) {
            return 1;
        } else {
            return null;
        }
    });
    
    // createOne
    test('createOne 성공할 경우 true 반환', async()=>{
        const result = await Comment.createOne(comment);

        expect(Comments.create).toBeCalledWith(comment);
        expect(result).toBeTruthy();
    });

    test('전달 받은 데이터에 postId, userId, comment 중 하나라도 없을 경우 false 반환', async()=>{
        comment = {
            comment: 'only comment'
        };
        const result = await Comment.createOne(comment);

        expect(Comments.create).toBeCalledWith(comment);
        expect(result).toBeFalsy();
    });

    // findOne
    test('commentId에 해당하는 데이터가 있으면 comment 반환', async()=>{
        const expectedComment = { 
            commentId: 1,
            postId: 1,
            userId: 1,
            comment: 'comment test',
            createdAt: 'date string',
            updatedAt: 'date string',
        };
        const result = await Comment.findOne(commentId);

        expect(Comments.findByPk).toBeCalledWith(commentId);
        expect(result).toEqual(expectedComment);
    });

    test('commentId에 해당하는 데이터가 없으면 null 반환', async()=>{
        commentId = 2;        
        const result = await Comment.findOne(commentId);

        expect(Comments.findByPk).toBeCalledWith(commentId);
        expect(result).toBe(null);
    });

    // findAll
    test('postId에 해당하는 데이터가 있으면 commentList 반환', async()=>{
        const postId = 1;
        const commentList = [{ commentId: 1 }, { commentId: 2 }, { commentId: 3 }];
        const result = await Comment.findAll(postId);        

        expect(Comments.findAll).toBeCalled();
        expect(result).toEqual(commentList);
    });

    test('postId에 해당하는 데이터가 없으면 빈 list 반환', async()=>{
        const postId = 2;        
        const result = await Comment.findAll(postId);

        expect(Comments.findAll).toBeCalled();
        expect(result).toEqual([]);
    });

    // updateOne
    test('commentId와 일치하는 데이터가 있으면 comment를 수정하고 [ 1 ] 반환', async () => {
        comment = {
            commentId: 1,
            userId: 1,
            comment: 'updated comment'
        };
        const result = await Comment.updateOne(comment);

        expect(Comments.update).toBeCalledWith(
            { comment: comment.comment },
            { where: { commentId: comment.commentId}}
        );
        expect(result).toEqual([1]);
    });

    test('commentId와 일치하는 데이터가 없으면 [] 반환', async () => {
        comment.commentId = 2;
        const result = await Comment.updateOne(comment);

        expect(Comments.update).toBeCalledWith(
            { comment: comment.comment },
            { where: { commentId: comment.commentId}}
        );
        expect(result).toEqual([]);
    });

    // deleteOne
    test('commentId와 userId 하나라도 일치하지 않는 데이터가 null 반환', async () => {
        const { commentId, userId } = comment;
        comment.commentId = 1;
        const result = await Comment.deleteOne({ commentId, userId });

        expect(Comments.destroy).toBeCalledWith({ where: {commentId, userId} });
        expect(result).toBe(null);
    });

    test('commentId와 userId 모두 일치하는 데이터가 있으면 1 반환', async () => {
        const { commentId, userId } = comment;
        const result = await Comment.deleteOne({ commentId, userId });

        expect(Comments.destroy).toBeCalledWith({ where: {commentId, userId} });
        expect(result).toBe(1);
    });
});