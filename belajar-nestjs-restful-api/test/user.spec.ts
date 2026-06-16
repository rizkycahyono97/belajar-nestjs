import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { describe, afterEach, it, beforeEach, expect } from '@jest/globals';

describe('User Controller', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST /api/user', () => {
    it('should be rejected if request invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user')
        .send({
          username: '',
          password: '',
          name: '',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
