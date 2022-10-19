const mockReq = {
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

console.log(Object.assign({}, mockReq));