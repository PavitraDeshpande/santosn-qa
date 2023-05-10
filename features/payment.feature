Feature: Stripe Payment Flow - Card Payment Validations

    Background:
        Given the user is at the Stripe Demo Site
        And the user auto generates shipping information

    Scenario Outline: Verify process flow for successful payments
        When the user enters the payment information with the following data
            | cardNumber   | cardExpiry   | cvc   |
            | <cardNumber> | <cardExpiry> | <cvc> |
        And the user clicks the Pay button
        Then the payment should be successful

        Examples:
            | cardNumber          | cardExpiry | cvc |
            | 4242 4242 4242 4242 | 12 / 26    | 123 |
            | 5555 5555 5555 4444 | 12 / 26    | 123 |
            | 3782 822463 10005   | 12 / 26    | 123 |


    Scenario Outline: Verify process flow for invalid card information
        When the user enters the payment information with the following data
            | cardNumber   | cardExpiry   | cvc   |
            | <cardNumber> | <cardExpiry> | <cvc> |
        And the user clicks the Pay button
        Then form error should show containing the following message "<errorMessage>"

        Examples:
            | cardNumber          | cardExpiry | cvc | errorMessage                                |
            | 4242 4242 4242 4242 | 0          | 123 | Your card's expiration date is incomplete.  |
            | 4242 4242 4242 4242 | 12 / 99    | 123 | Your card's expiration year is invalid.     |
            | 4242 4242 4242 4242 | 12 / 20    | 123 | Your card's expiration year is in the past. |
            | 4242 4242 4242 4242 | 12 / 26    | 99  | Your card's security code is incomplete.    |
            | 4242 4242 4242 4241 | 12 / 26    | 123 | Your card number is invalid.                |
            
    Scenario Outline: Verify process flow for declined payments
        When the user enters the payment information with the following data
            | cardNumber   | cardExpiry   | cvc   |
            | <cardNumber> | <cardExpiry> | <cvc> |
        And the user clicks the Pay button
        Then the payment should be declined
        And checkout error should show containing the following message "<errorMessage>"

        Examples:
            | cardNumber       | cardExpiry | cvc | errorMessage                                    |
            | 4000000000000002 | 12 / 26    | 123 | Your card has been declined.                    |
            | 4000000000009995 | 12 / 26    | 123 | Your card has insufficient funds.               |
            | 4000000000009987 | 12 / 26    | 123 | Your card has been declined.                    |
            | 4000000000009979 | 12 / 26    | 123 | Your card has been declined.                    |
            | 4100000000000019 | 12 / 26    | 123 | Your card has been declined.                    |
            | 4000000000000127 | 12 / 26    | 123 | Your card's security code is incorrect.         | 
            | 4000000000000069 | 12 / 26    | 123 | Your card has expired.                          |
            | 4000000000000119 | 12 / 26    | 123 | An error occurred while processing your card.   |