Feature: Accept Invitation

  Scenario: Accept a pending invitation
    Given an invitation with ID "1" exists and is pending
    When I accept the invitation with ID "1"
    Then the response status should be 200
    And the invitation status should be "accepted"
    And the invitation accepted_at should not be null
    And a new member should be created for the group

  Scenario: Accept a non-pending invitation
    Given an invitation with ID "1" exists and is not pending
    When I accept the invitation with ID "1"
    Then the response status should be 412

  Scenario: Reject a pending invitation
    Given an invitation with ID "1" exists and is pending
    When I reject the invitation with ID "1"
    Then the response status should be 200
    And the invitation status should be "rejected"

  Scenario: Invite a user to a group
    Given a user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba" exists
    And a group with ID "1" exists
    When I invite the user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba" to the group with ID "1"
    Then the response status should be 200
    And a new invitation should be created for the user
