import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import cookieParser from 'cookie-parser';
import { faker } from '@faker-js/faker';
import request from 'supertest';

describe('delete user controller [e2e]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());

    await app.init();
  });

  it('should be able to delete a user', async () => {
    const createUserResponse = await request(app.getHttpServer())
      .post('/user/')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        name: faker.person.firstName(),
        password: 'any_password',
      });

    const { username } = createUserResponse.body.resource;

    const authResponse = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: username,
        password: 'any_password',
      });

    const token = authResponse.body.token;
    const user = authResponse.body.resource;

    const deleteUserResponse = await request(app.getHttpServer())
      .delete(`/user/?userId=${user.id}`)
      .set('Cookie', [`authorization= Bearer ${token}`, `user=${user}`])
      .send();

    expect(deleteUserResponse.statusCode).toEqual(204);
  });
});
