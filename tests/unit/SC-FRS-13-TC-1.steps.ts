import { defineFeature, loadFeature } from 'jest-cucumber';
import Container from 'typedi';
import { GetCurrentUTCDateTimeUseCase } from '../../src/domain/usecases/status/GetCurrentUTCDateTimeUseCase';
import path from 'path';

const feature = loadFeature(
  path.join(__dirname, './features/SC-FRS-13-TC-1.feature')
);

defineFeature(feature, (test) => {
  test('GetCurrentUTCDateTimeUseCase의 execute 함수를 실행한다', ({
    given,
    when,
    then,
    and,
  }) => {
    let result: string;
    const getCurrentUTCDateTimeUseCase = Container.get(
      GetCurrentUTCDateTimeUseCase
    );
    given(
      'GetCurrentUTCDateTimeUseCase의 execute 함수를 import한 상태에서',
      () => {
        expect(getCurrentUTCDateTimeUseCase.execute).toBeDefined();
      }
    );

    when('execute 함수를 호출하면', async () => {
      result = await getCurrentUTCDateTimeUseCase.execute();
    });

    then('현재 날짜와 시간을 UTC로 리턴하고', () => {
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    and(
      '리턴 값이 ISO8601 format(YYYY-MM-DDTHH:MM:SS.SSSZ)이어야 한다.',
      () => {
        // ISO8601 형식 검증을 위한 정규식
        const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
        expect(result).toMatch(iso8601Regex);
      }
    );
  });
});
