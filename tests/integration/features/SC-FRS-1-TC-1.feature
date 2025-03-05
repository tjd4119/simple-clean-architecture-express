Feature: SC-FRS-13-TC-1

도입 문의 생성 테스트
	
	Scenario: 도입 문의 생성
		Given 도입 문의 생성에 필요한 payload를 가진 상태에서
		When [POST] /internal/v1/supports/sales-inquiries API를 호출하면
		Then 201 Created status code를 리턴하고
		And 생성된 도입 문의 정보를 리턴한다.