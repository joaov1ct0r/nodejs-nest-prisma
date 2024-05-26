import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import cookieParser from 'cookie-parser';
import { faker } from '@faker-js/faker';
import request from 'supertest';

describe('sign out controller [e2e]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());

    await app.init();
  });

  it('should be able to sign out', async () => {
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

    const signOutResponse = await request(app.getHttpServer())
      .get('/logout')
      .set('Cookie', [`authorization= Bearer ${token}`, `user=${user}`])
      .send();

    expect(signOutResponse.statusCode).toEqual(200);
  });
});
