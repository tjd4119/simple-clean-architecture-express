import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import path from 'path';
import app from '../../src/app';

const feature = loadFeature(
  path.join(__dirname, './features/SC-FRS-14-TC-1.feature')
);
let response: request.Response;
beforeAll(() => {
  // wait a second for the database connection
  return new Promise((resolve) => setTimeout(resolve, 1000));
});

defineFeature(feature, (test) => {
  test('GET /public/v1/health-check API를 호출한다', ({
    given,
    when,
    then,
    and,
  }) => {
    given('서버 상태 스캔 API를 사용할 수 있는 상태에서', () => {
      // do nothing
    });

    when('[GET] /public/v1/health-check API를 호출하면', async () => {
      response = await request(app).get('/public/v1/health-check');
    });

    then('200 status code를 리턴하고', () => {
      expect(response.status).toEqual(200);
    });

    and(
      '"status" property에 "online" 값이 있는 객체가 리턴되어야 한다.',
      () => {
        expect(response.body).toHaveProperty('status', 'online');
      }
    );
  });
});
