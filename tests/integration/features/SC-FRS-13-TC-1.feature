Feature: SC-FRS-13-TC-1

서버 시간 조회 API 테스트
	
	Scenario: GET /public/v1/ping API를 호출한다
		Given 서버 시간 조회 API를 사용할 수 있는 상태에서
		When [GET] /public/v1/ping API를 호출하면
		Then 200 status code를 리턴하고
		And 리턴 값이 ISO8601 format(YYYY-MM-DDTHH:MM:SS.SSSZ)이어야 한다.
