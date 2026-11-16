@checkout
Feature: Checkout
  As a customer with products in the cart
  I want to enter my delivery details and place the order
  So that I receive the products I ordered

  Scenario: Complete checkout with valid customer details
    Given I am logged in as "standard_user"
    And I have added "Sauce Labs Backpack" to the cart
    When I open the cart
    And I proceed to checkout
    And I continue without filling in customer details
    Then I should see the checkout error "Error: First Name is required"
    When I enter customer details "Mari", "Maasikas" and "10111"
    And I continue to the order overview
    Then the order overview should show "Sauce Labs Backpack"
    And the order total should be "Total: $32.39"
    When I finish the order
    Then I should see the order confirmation "Thank you for your order!"
