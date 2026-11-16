@cart @smoke
Feature: Shopping cart management
  As a customer browsing the catalogue
  I want to add products to the cart and remove them
  So that I can control what I am going to buy

  Scenario: Add two products to the cart and remove one
    Given I am logged in as "standard_user"
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2"
    When I open the cart
    Then the cart should contain "Sauce Labs Backpack" and "Sauce Labs Bike Light"
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart badge should show "1"
    And the cart should not contain "Sauce Labs Backpack"
