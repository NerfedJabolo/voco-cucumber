@login @smoke
Feature: Customer login
  As a registered Sauce Demo customer
  I want to sign in and sign out securely
  So that only authorised users can reach the shop

  Scenario: Successful login and logout with a standard user
    Given I am on the Sauce Demo login page
    When I log in as "standard_user" with password "secret_sauce"
    Then I should be on the inventory page
    And I should see 6 products listed
    When I log out
    Then I should be on the login page
