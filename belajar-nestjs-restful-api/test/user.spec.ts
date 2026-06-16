import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import {
  describe,
  it,
  beforeEach,
  expect,
  beforeAll,
  afterAll,
} from '@jest/globals';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../src/common/prisma.service';

describe('User Controller', () => {
  let app: INestApplication<App>;
  let logger: Logger;
  let testService: TestService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/user', () => {
    beforeEach(async () => {
      await testService.deleteUser();
    });

    it('should be rejected if request invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user')
        .send({
          username: '',
          password: '',
          name: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to register', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user')
        .send({
          username: 'test',
          password: await bcrypt.hash('test123', 10),
          name: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');
    });

    it('should be rejected if username exists', async () => {
      await testService.createUser();

      const response = await request(app.getHttpServer())
        .post('/api/user')
        .send({
          username: 'test',
          password: await bcrypt.hash('test123', 10),
          name: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  afterAll(async () => {
    if (app) {
      const prismaService = app.get(PrismaService);
      await prismaService.$disconnect();
      await app.close();
    }
  });
});
