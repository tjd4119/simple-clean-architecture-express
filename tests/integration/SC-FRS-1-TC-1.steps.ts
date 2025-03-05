import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import path from 'path';
import { cleanUpDatabase, closeDatabase } from './utils/db';
import app from '../../src/app';

const feature = loadFeature(
  path.join(__dirname, './features/SC-FRS-1-TC-1.feature')
);

defineFeature(feature, (test) => {
  let response: request.Response;
  let payload: {
    organizationName: string;
    contactName: string;
    contactEmail: string;
    contactPhonenumber: string;
    data: string;
  };

  beforeAll(() => {
    // wait a second for the database connection
    return new Promise((resolve) => setTimeout(resolve, 1000));
  });

  afterEach(async () => {
    await cleanUpDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  test('도입 문의 생성', ({ given, when, then }) => {
    given('도입 문의 생성에 필요한 payload를 가진 상태에서', () => {
      payload = {
        organizationName: 'Crooks - McClure',
        contactName: 'Trevor_Hirthe58',
        contactEmail: 'Merle63@yahoo.com',
        contactPhonenumber: '+821012345678',
        data: 'Turba teres creator vox amaritudo asperiores sui.',
      };
    });

    when(
      '[POST] /internal/v1/supports/sales-inquiries API를 호출하면',
      async () => {
        response = await request(app)
          .post('/internal/v1/supports/sales-inquiries')
          .send(payload);
      }
    );

    then('201 Created status code를 리턴하고', () => {
      expect(response.status).toEqual(201);
    });
    then('생성된 도입 문의 정보를 리턴한다.', () => {
      expect(response.body).toHaveProperty('salesInquiryId');
      expect(response.body.organizationName).toEqual(payload.organizationName);
      expect(response.body.contactName).toEqual(payload.contactName);
      expect(response.body.contactEmail).toEqual(payload.contactEmail);
      expect(response.body.contactPhonenumber).toEqual(
        payload.contactPhonenumber
      );
      expect(response.body.data).toEqual(payload.data);
      expect(response.body.status).toEqual('pending');
    });
  });
});
