import { defineFeature, loadFeature } from 'jest-cucumber';
import { getMockReq, getMockRes } from '@jest-mock/express';
import path from 'path';
import { cleanUpDatabase, closeDatabase, initializeDatabase } from './utils/db';
import { createSalesInquiry } from '../../src/interface/controllers/CreateSalesInquiryController';

const feature = loadFeature(
  path.join(__dirname, './features/createSalesInquiry.feature')
);

defineFeature(feature, (test) => {
  // Mock Request/Response
  let mockReq: ReturnType<typeof getMockReq>;
  let mockRes: ReturnType<typeof getMockRes>['res'];
  let mockNext: ReturnType<typeof getMockRes>['next'];

  let payload: {
    organizationName: string;
    contactName: string;
    contactEmail: string;
    contactPhonenumber: string;
    data: string;
  };

  beforeAll(async () => {
    await initializeDatabase();
    // wait a second for the database connection
    return new Promise((resolve) => setTimeout(resolve, 1000));
  });

  afterEach(async () => {
    await cleanUpDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  test('유효한 payload로 도입 문의를 생성하는 경우', ({
    given,
    when,
    then,
  }) => {
    given(
      '"도입 문의" 생성에 필요한 유효한 필드를 가진 payload가 주어졌을 때',
      () => {
        payload = {
          organizationName: '디파이',
          contactName: '홍길동',
          contactEmail: 'dev@dyphi.com',
          contactPhonenumber: '+821012345678',
          data: '도입 문의 드립니다.',
        };
      }
    );

    when('createSalesInquiry Controller 함수를 호출하면', async () => {
      // init Mock Request, Response
      mockReq = getMockReq({ body: payload });
      const { res, next } = getMockRes();
      mockRes = res;
      mockNext = next;

      // call createSalesInquiry
      await createSalesInquiry(mockReq, mockRes, mockNext);
    });

    then('"201" 상태 코드를 반환해야 한다', () => {
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    then('생성된 도입 문의 정보를 반환해야 한다', () => {
      const jsonCall = (mockRes.json as jest.Mock).mock.calls[0][0];
      expect(jsonCall).toHaveProperty('salesInquiryId');
      expect(jsonCall).toHaveProperty('inquiredAt');
    });
  });
});
