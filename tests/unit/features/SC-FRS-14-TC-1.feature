Feature: SP-FRS-14-TC-1

	서버 상태 스캔 기능 테스트
	
	Scenario: scanServerStatusUseCase의 execute 함수를 실행한다
		Given scanServerStatusUseCase의 execute 함수를 import한 상태에서
		When execute 함수를 호출하면
		Then "status" property에 "online" 값이 있는 객체가 리턴되어야 한다