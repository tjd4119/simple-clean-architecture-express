Feature: User CRUD operations

  Scenario: Create a new user
    Given I have a valid user payload
    When I send a POST request to "/users"
    Then the response status should be 201
    And the response should contain the created user

  Scenario: Get all users
    Given users exist
    When I send a GET request to "/users"
    Then the response status should be 200
    And the response should contain a list of users

  Scenario: Get a user by ID
    Given a user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba" exists
    When I send a GET request to "/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba"
    Then the response status should be 200
    And the response should contain the user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba"

  Scenario: Delete a user
    Given a user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba" exists
    When I send a DELETE request to "/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba"
    Then the response status should be 204
    And NotFoundError should be returned when I send a GET request to "/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba"

  Scenario: Update a user
    Given a user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba" exists
    And I have a valid update payload
    When I send a PUT request to "/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba"
    Then the response status should be 200
    And the response should contain the updated user
