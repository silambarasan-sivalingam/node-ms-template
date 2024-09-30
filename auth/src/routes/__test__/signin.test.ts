import request from "supertest";
import { app } from '../../app'

it('fail when a email that does not exist is supplied', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
})
