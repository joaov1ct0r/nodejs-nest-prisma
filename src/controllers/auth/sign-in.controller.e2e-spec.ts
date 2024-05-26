import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { faker } from '@faker-js/faker';
import request from 'supertest';

describe('sign in controller [e2e]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());

    await app.init();
  });

  it('should be able to authenticate', async () => {
    const createUserResponse = await request(app.getHttpServer())
      .post('/user/')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        name: faker.person.firstName(),
        password: 'any_password',
      });

    const user = createUserResponse.body.resource;

    const authResponse = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: user.username,
        password: 'any_password',
      });

    expect(authResponse.statusCode).toEqual(201);
  });
});
