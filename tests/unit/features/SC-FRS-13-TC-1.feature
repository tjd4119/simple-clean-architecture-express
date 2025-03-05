Feature: SC-FRS-13-TC-1

서버 시간 조회 기능 테스트
	
	Scenario: GetCurrentUTCDateTimeUseCase의 execute 함수를 실행한다
		Given GetCurrentUTCDateTimeUseCase의 execute 함수를 import한 상태에서
		When execute 함수를 호출하면
		Then 현재 날짜와 시간을 UTC로 리턴하고
		And 리턴 값이 ISO8601 format(YYYY-MM-DDTHH:MM:SS.SSSZ)이어야 한다.