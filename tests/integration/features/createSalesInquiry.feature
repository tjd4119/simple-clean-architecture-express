Feature: createSalesInquiry
  도입 문의 생성 테스트

  Scenario: 유효한 payload로 도입 문의를 생성하는 경우
    Given "도입 문의" 생성에 필요한 유효한 필드를 가진 payload가 주어졌을 때
    When createSalesInquiry Controller 함수를 호출하면
    Then "201" 상태 코드를 반환해야 한다
    And 생성된 도입 문의 정보를 반환해야 한다
