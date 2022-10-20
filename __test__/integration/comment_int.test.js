import request from 'supertest';
import app from '../../app.js';
import Comments from '../../database/models/comment.js';
import jwt from '../../utils/jwt.js';
import env from '../../config.env.js'
import sequelize from '../../database/config/connection.js'
import associateModels from '../../database/config/association.js'


beforeAll(async()=>{
    if (env.MODE === 'test') {
        await Comments.destroy({ where: {}});

        await sequelize.authenticate();
        associateModels(sequelize);
    } else {
        throw new Error('NODE_ENV !== test');
    }
});

afterAll(async()=>{
    await sequelize.clone();
})

describe('Comment Integreation Test', ()=>{
    const postId = 1;
    const commentId = 1;
    const userId = 1;
    const comment = {
        comment: 'test comment'
    };
    const accessToken = jwt.sign({ userId: userId, nickname: 'nickname'});
    const refreshToken = jwt.refresh();
    beforeEach(()=>{
        jest.resetAllMocks();
    });

    test('GET /comments/:postId >> no data', async()=>{
        const response = await request(app)
            .get(`/users/:${postId}`)
            .set({ authorization: `Bearer ${accessToken}`, refreshToken: refreshToken });
        
            console.log(response);
    });

    // test('POST /comments/:postId >> create');

    // test('GET /comments/:postId >> should have data created from prev test');

    // test('PUT /comments/:commentId >> successfully update comment');

    // test('DELETE /comments/:commentId >> successfully delete comment');

    // test('GET /comments/:postId >> should have no data');
});