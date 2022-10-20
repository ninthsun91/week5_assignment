import request from 'supertest';
import app from '../../app.js';
import jwt from '../../utils/jwt.js';
import env from '../../config.env.js'
import sequelize from '../../database/config/connection.js';
import associateModels from '../../database/config/association.js';

import emptyTables from '../emptyTables.js';


const tokenHeader = {
    authorization: ``,
    refreshtoken: ``
};
const ids = {
    userId: 0,
    postId: 0,
    commentId: 0,
};

beforeAll(async()=>{
    if (env.MODE === 'test') {
        await sequelize.authenticate();
        associateModels(sequelize);

        await emptyTables();

        await request(app).post('/signup').send({ nickname: 'boss', password: '1234', confirm: '1234' });
        const signinRes = await request(app)
            .post('/login').send({ nickname: 'boss', password: '1234' });
        
        tokenHeader.authorization = signinRes.headers.authorization;
        tokenHeader.refreshtoken = signinRes.headers.refreshtoken;        

        const postRes = await request(app)
            .post('/posts')
            .set(tokenHeader)
            .send({ title: 'title', content: 'content' });
        
        ids.userId = postRes.body.result.userId;
        ids.postId = postRes.body.result.postId;
        console.log(ids);
    } else {
        throw new Error('NODE_ENV !== test');
    }
});

afterAll(async()=>{
    await sequelize.close();
});

describe('Comment Integreation Test', ()=>{
    beforeEach(()=>{
        jest.resetAllMocks();
    });

    test('GET /comments/:postId >> no data', async()=>{
        const response = await request(app)
            .get(`/comments/${ids.postId}`)

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: [] });
    });

    test('POST /comments/:postId >> create', async()=>{
        const { userId, postId } = ids;
        const comment = {
            comment: 'test comment'
        };

        const response = await request(app)
            .post(`/comments/${postId}`)
            .set(tokenHeader)
            .send(comment);

        ids.commentId = response.body.result.commentId;
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

    test('GET /comments/:postId >> should have data created from prev test', async () => {
        const response = await request(app)
            .get(`/comments/${ids.postId}`);

        expect(response.status).toBe(200);
        expect(response.body.data[0].commentId).toBe(ids.commentId);
    });

    test('PUT /comments/:commentId >> successfully update comment', async () => {
        const comment = { comment: 'updates'};
        const response = await request(app)
            .put(`/comments/${ids.commentId}`)
            .set(tokenHeader)
            .send(comment);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

    test('DELETE /comments/:commentId >> successfully delete comment', async () => {
        const response = await request(app)
            .delete(`/comments/${ids.commentId}`)
            .set(tokenHeader)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

    test('GET /comments/:postId >> should have no data', async () => {
        const response = await request(app)
            .get(`/comments/${ids.postId}`)
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: [] });
    });
});