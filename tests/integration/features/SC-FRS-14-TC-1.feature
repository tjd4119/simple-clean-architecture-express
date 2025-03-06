Feature: SP-FRS-14-TC-1

서버 상태 스캔 API 테스트

	Scenario: GET /public/v1/health-check API를 호출한다
		Given 서버 상태 스캔 API를 사용할 수 있는 상태에서
		When [GET] /public/v1/health-check API를 호출하면
		Then 200 status code를 리턴하고
		And "status" property에 "online" 값이 있는 객체가 리턴되어야 한다.
