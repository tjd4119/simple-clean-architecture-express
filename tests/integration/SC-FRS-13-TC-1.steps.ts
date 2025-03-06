import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import path from 'path';
import app from '../../src/app';
const feature = loadFeature(
  path.join(__dirname, './features/SC-FRS-13-TC-1.feature')
);
let response: request.Response;
beforeAll(() => {
  // wait a second for the database connection
  return new Promise((resolve) => setTimeout(resolve, 1000));
});

defineFeature(feature, (test) => {
  test('GET /public/v1/ping API를 호출한다', ({ given, when, then, and }) => {
    given('서버 시간 조회 API를 사용할 수 있는 상태에서', () => {
      // do nothing
    });

    when('[GET] /public/v1/ping API를 호출하면', async () => {
      response = await request(app).get('/public/v1/ping');
    });

    then('200 status code를 리턴하고', () => {
      expect(response.status).toEqual(200);
    });

    and(
      '리턴 값이 ISO8601 format(YYYY-MM-DDTHH:MM:SS.SSSZ)이어야 한다.',
      () => {
        // ISO8601 형식 검증을 위한 정규식
        const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
        expect(response.body.time).toMatch(iso8601Regex);
      }
    );
  });
});
