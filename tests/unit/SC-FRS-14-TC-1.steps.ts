import { defineFeature, loadFeature } from 'jest-cucumber';
import Container from 'typedi';
import { ScanServerStatusUseCase } from '../../src/domain/usecases/status/ScanServerStatusUseCase';
import path from 'path';

const feature = loadFeature(
  path.join(__dirname, './features/SC-FRS-14-TC-1.feature')
);

defineFeature(feature, (test) => {
  test('scanServerStatusUseCase의 execute 함수를 실행한다', ({
    given,
    when,
    then,
  }) => {
    let result: Object;
    const scanServerStatusUseCase = Container.get(ScanServerStatusUseCase);
    given('scanServerStatusUseCase의 execute 함수를 import한 상태에서', () => {
      expect(scanServerStatusUseCase.execute).toBeDefined();
    });

    when('execute 함수를 호출하면', async () => {
      result = await scanServerStatusUseCase.execute();
    });

    then(
      '"status" property에 "online" 값이 있는 객체가 리턴되어야 한다',
      () => {
        expect(result).toHaveProperty('status', 'online');
      }
    );
  });
});
